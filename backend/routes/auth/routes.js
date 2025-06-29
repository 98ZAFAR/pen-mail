const express = require('express');
const router = express.Router();

const { handleRegister, handleLogin, handleLogout, handleForgotPassword, handleResetPassword } = require('../../controllers/auth/controllers');
router.post('/register', handleRegister);
router.post('/login', handleLogin);
router.post('/logout', handleLogout);
router.post('/forgot-password', handleForgotPassword);
router.post('/reset-password/:token', handleResetPassword);

module.exports = router;