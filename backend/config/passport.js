// const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const mongoose = require('mongoose');
const User = require('../models/User');

require('dotenv').config();

module.exports = (passport) => {
    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => done(err, user));
    });

    // passport.use(new GoogleStrategy({
    //     clientID: process.env.GOOGLE_CLIENT_ID,
    //     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    //     callbackURL: '/auth/google/callback'
    // },async(accessToken, refreshToken, profile, done) => {
    //     const extinguisher = await User.findOne({ googleId: profile.is });
    //     if (extinguisher) return done(null, extinguisher);

    //     const user = await new User({googleId: profile.id, name: profile.displayName, email: profile.emails[0].value }).save();
    //     done(null, user);
    // }));

    passport.use(new GitHubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: '/auth/github/callback'
    },async(accessToken, refreshToken, profile, done) => {
        const extinguisher = await User.findOne({ githubId: profile.is });
        if (extinguisher) return done(null, extinguisher);

        const user = await new User({githubId: profile.id, name: profile.displayName, email: profile.emails[0].value }).save();
        done(null, user);
    }));
};