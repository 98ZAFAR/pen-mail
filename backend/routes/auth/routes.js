const express = require('express');
const router = express.Router();

const { handleRegister, handleLogin, handleLogout } = require('../../controllers/auth/controllers');
router.post('/register', handleRegister);
router.post('/login', handleLogin);
router.post('/logout', handleLogout);

module.exports = router;