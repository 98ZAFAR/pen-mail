const express = require('express');
const router = express.Router();
const { authLimiter } = require("../../middlewares/rateLimiter");
const {
  registerValidation,
  loginValidation,
  forgotPasswordValidation,
  resetPasswordValidation,
} = require("../../middlewares/validation/authValidation");
const validateRequest = require("../../middlewares/validation/validateRequest");

const { handleRegister, handleLogin, handleLogout, handleForgotPassword, handleResetPassword } = require('../../controllers/auth/controllers');

router.post('/register', authLimiter, registerValidation, validateRequest, handleRegister);
router.post('/login', authLimiter, loginValidation, validateRequest, handleLogin);
router.post('/logout', handleLogout);
router.post('/forgot-password', authLimiter, forgotPasswordValidation, validateRequest, handleForgotPassword);
router.post('/reset-password/:token', authLimiter, resetPasswordValidation, validateRequest, handleResetPassword);

module.exports = router;