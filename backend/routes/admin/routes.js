const express = require("express");
const { createStamp, editStamp, deleteStamp, getAllStamps } = require("../../controllers/stamp/controllers");
const upload = require("../../middlewares/cloud/upload");
const router = express.Router();

// Stamp Access - Admin
router.post('/stamp/create', upload.single('imageUrl'), createStamp);
router.put('/stamp/edit/:stampId', upload.single('imageUrl'), editStamp);
router.delete('/stamp/delete/:stampId', deleteStamp);
router.get('/stamp/all', getAllStamps);

module.exports = router;