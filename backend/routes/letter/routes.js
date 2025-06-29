const express = require("express");
const { ValidateUser } = require("../../middlewares/auth/verifyUser");
const {
  sendLetter,
  getInbox,
  getOutbox,
  deleteLetter,
  getLetter,
} = require("../../controllers/letter/controllers");
const router = express.Router();

// Letter routes
router.post("/send-letter", ValidateUser, sendLetter);
router.get("/get-letter/:id", ValidateUser, getLetter);
router.delete("/delete-letter/:id", ValidateUser, deleteLetter);

// Inbox and Outbox routes
router.get("/inbox", ValidateUser, getInbox);
router.get("/outbox", ValidateUser, getOutbox);

module.exports = router;
