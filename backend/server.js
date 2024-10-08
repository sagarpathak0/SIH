const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const testRoutes = require('./routes/testRoutes')
require('./config/passport')(passport);
const cors = require('cors');
dotenv.config();

const app = express();

app.use(cors({
    origin: "*",
}));

app.use(express.json());
app.use(session({ secret: process.env.JWT_SECRET, resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());



mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));


app.use('/auth', authRoutes);
app.use('/test', testRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));