const express = require('express');
const router = express.Router();
const passport = require('passport');
const { signup, login, registerWithGoogle, googleCallback } = require('../controllers/auth.controller');
const isAuthorized = require('../middlewares/auth.middleware');

router.post('/register', signup);
router.post('/login', [isAuthorized], login);
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/failed',
    }),
    function (req, res) {
        res.redirect('/dashboard')

    }
);

module.exports = router;
