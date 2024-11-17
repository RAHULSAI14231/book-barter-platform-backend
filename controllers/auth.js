const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const User = require('../models/User');
const crypto = require('crypto');


// @desc    Register User
// @route   POST /register
// @access  Public

exports.register = asyncHandler(async (req, res) => {
    const { firstName, lastName, email, password, role } = req.body;
    const user = await User.create({ firstName, lastName, email, password, role });

    sendTokenResponse(user, 200, res, false);

});

// @desc    Get Logged in user
// @route   GET /getLoggedInUser
// @access  Public

exports.getLoggedInUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id);
    res.status(200).json({
        success: true,
        data: user
    });
});

// @desc    User Login
// @route   POST /login
// @access  Public

exports.login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    
    if(!email || !password){
        return next(new ErrorResponse('Please provide an email and password', 400));
    }

    const user = await User.findOne({ email }).select('+password')
    if(!user){
        return next(new ErrorResponse('Invalid Credentials', 401));
    }

    const isPasswordMatched = await user.matchPassword(password);

    if(!isPasswordMatched){
        return next(new ErrorResponse('Invalid Credentials', 401));
    }

    sendTokenResponse(user, 200, res, true);
});

// @desc    Forgot Password
// @route   POST /forgotPassword
// @access  Public

exports.forgotPassword = asyncHandler(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return next(new ErrorResponse('No user with that email', 200));
    }

    const resetToken = await user.getResetPasswordToken();

    await user.save({validateBeforeSave: false});

    res.status(200).json({
        success: true,
        data: {resetToken: resetToken}
    });
});

// @desc    Reset Password
// @route   PUT /resetPassword/:resettoken
// @access  Public

exports.resetPassword = asyncHandler(async (req, res, next) => {
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.resettoken)
    .digest('hex');
    
    const user = await User.findOne({ resetPasswordToken, resetPasswordExpire: {$gt: Date.now()} });

    if(!user){
        return next(new ErrorResponse('Invalid Token', 400));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    sendTokenResponse(user, 200, res);
});

// @desc Utility to send token response
const sendTokenResponse = (user, statusCode, res) => {
    const token = user.getSignedJWTToken();

    const options = {
        expiresIn: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: true
    }

    res
    .status(statusCode)
    .cookie('token', token, options)
    .json({
        success: true,
        token
    })
}