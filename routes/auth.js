const express = require('express');
const bcrypt = require('bcrypt');

const User = require('../models/User');
const { register, getLoggedInUser, login, forgotPassword, resetPassword } = require('../controllers/auth')

const router = express.Router();
const { protect } = require('../middleware/auth');

router.post('/register', register);

router.get('/getLoggedInUser', protect, getLoggedInUser);

router.post('/login', login);

router.post('/forgotPassword', forgotPassword);
router.put('/resetPassword/:resettoken', resetPassword);

module.exports = router;