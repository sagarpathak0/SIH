const express = require('express');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const User = require('../models/User');
console.log(User);
const { ensureAuthenticated } = require('../middleware/auth');

const router = express.Router();

router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) return res.status(400).send('User already exists');
    
    const newUser = new User({ name, email, password });
    await newUser.save();
    res.send('User registered');
});


router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send('Invalid credentials');
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).send('Invalid credentials');
    
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
});

router.post('/send-otp', async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send('User not found');
    
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otp = otp;
    user.otpExpires = Date.now() + 3600000; // 1 hour
    await user.save();
    
    // Send OTP via email
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });
    
    const mailOptions = {
        to: user.email,
        subject: 'Your OTP Code',
        text: `Your OTP code is ${otp}`
    };
    
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) return res.status(500).send('Error sending email');
        res.send('OTP sent');
    });
});

// Verify OTP
router.post('/verify-otp', async (req, res) => {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send('User not found');
    
    if (otp !== user.otp || Date.now() > user.otpExpires) return res.status(400).send('Invalid or expired OTP');
    
    user.otp = null;
    user.otpExpires = null;
    await user.save();
    res.send('OTP verified');
});


// Change Password
router.post('/change-password', ensureAuthenticated, async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user.id);
    
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) return res.status(400).send('Invalid current password');
    
    user.password = newPassword;
    await user.save();
    res.send('Password changed successfully');
});


// Google OAuth
// router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
// router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
//     res.redirect('/dashboard');
// });


// GitHub OAuth
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));
router.get('/github/callback', passport.authenticate('github', { failureRedirect: '/login' }), (req, res) => {
    res.redirect('/dashboard');
});

module.exports = router;