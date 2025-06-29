const express = require('express');
const { handleGetAllUsers, handleGetUserProfile } = require('../../controllers/general/controllers');
const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({ message: "Welcome to Pen Mail API!" });
});

router.get('/users', handleGetAllUsers);
router.get('/users/:userId', handleGetUserProfile);

module.exports = router;
