const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/auth.controller');
const isAuthorized = require('../middlewares/auth.middleware');

router.post('/register',signup);
router.post('/login',[isAuthorized],login);

module.exports = router;
