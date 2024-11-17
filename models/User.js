const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const UserSchema = new mongoose.Schema({
    firstName: { type: String, required: [true, 'Please add a First Name'] },
    lastName: { type: String, required: [true, 'Please add a Last Name'] },
    email: {
        type: String,
        unique: true,
        required: [true, 'Please add an email'],
        match: [
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please enter a valid email']
    },
    password: { 
        type: String,
        required: [true, 'Please add an password'],
        minlength: 6,
        select: false
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    createdAt: {
        type: Date,
        default: Date.now
    },
    role: {
        type: String,
        enum: ['user', 'publisher'],
        default: 'user'
    }
});

UserSchema.pre('save', async function(next) {
    if(!this.isModified('password')){
        next();
    }
    const _hash = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, _hash);
})

UserSchema.methods.getSignedJWTToken = function() {
    return jwt.sign({id: this._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    })
}

UserSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

UserSchema.methods.getResetPasswordToken = async function() {
    const resetToken = crypto.randomBytes(20).toString('hex');

    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
    return resetToken;
}

module.exports = mongoose.model('User', UserSchema);