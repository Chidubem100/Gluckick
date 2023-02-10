const express = require('express');
const router = express.Router();
const {isLoggedIn}= require('../middlewares/authenticationMiddleware');

const {
	signUp,
	register,
	login,
	loginC,
	logout
} = require('../controller/auth');

router.route('/signup').get(signUp).post(register);

router.route('/login').get(loginC).post(login)

router.route('/logout').get(logout);

module.exports = router;