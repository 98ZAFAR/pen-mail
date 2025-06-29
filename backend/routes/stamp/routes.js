const express = require("express");
const { getAllStamps, collectStamp, getMyStamps } = require("../../controllers/stamp/controllers");
const router = express.Router();

router.get('/', getAllStamps);
router.post('/collect/:stampId', collectStamp);
router.get('/my-stamps', getMyStamps);

module.exports = router;