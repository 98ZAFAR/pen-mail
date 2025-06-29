const express = require("express");
const { createStamp, editStamp, deleteStamp, getAllStamps } = require("../../controllers/stamp/controllers");
const upload = require("../../middlewares/cloud/upload");
const { handleGetAllUsers } = require("../../controllers/general/controllers");
const { getUserProfile, deleteUser } = require("../../controllers/user/controllers");
const router = express.Router();

// Stamp Management - Admin
router.post('/stamp/create', upload.single('imageUrl'), createStamp);
router.put('/stamp/edit/:stampId', upload.single('imageUrl'), editStamp);
router.delete('/stamp/delete/:stampId', deleteStamp);
router.get('/stamp/all', getAllStamps);

// User Management - Admin
router.get('/user/all', handleGetAllUsers);
router.get('/user/:userId', getUserProfile);
router.delete('/user/:userId', deleteUser);

// Letter Management - Admin

module.exports = router;