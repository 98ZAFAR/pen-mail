const express = require('express');
const { handleGetAllUsers, handleGetUserProfile } = require('../../controllers/general/controllers');
const router = express.Router();

// Home Route
router.get('/', (req, res) => {
  res.status(200).json({ message: "Welcome to Pen Mail API!" });
});

// General Routes
router.get('/users', handleGetAllUsers);
router.get('/users/:userId', handleGetUserProfile);

module.exports = router;
