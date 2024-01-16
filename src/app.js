const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const router = require('./routes/router.js');
const cookieParser = require("cookie-parser");
const passport = require('passport');
const session = require('express-session');
require('./passport');
dotenv.config();



const app = express();
const PORT = process.env.PORT || 3000;

app.use(session({
    secret: process.env.secret,
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());


mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.get('/dashboard', (req, res) => {
    res.send('Fashboard!');
});

app.get('/failed', (req, res) => {
    res.send('Failed!');
});

app.use('/auth', router);



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});