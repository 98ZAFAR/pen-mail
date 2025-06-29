const express = require('express');
const {ValidateUser} = require('../../middlewares/auth/verifyUser');
const { getUserProfile, updateUserProfile } = require('../../controllers/user/controllers');
const upload = require('../../middlewares/cloud/upload');
const router = express.Router();

router.get('/profile', ValidateUser, getUserProfile);
router.put('/update', ValidateUser, upload.single('avatarUrl'), updateUserProfile); // Assuming you have an update function

module.exports = router;