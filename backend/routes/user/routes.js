const express = require('express');
const ValidateUser = require('../../middlewares/auth/verifyUser');
const router = express.Router();

app.get('/profile', ValidateUser,)

module.exports = router;