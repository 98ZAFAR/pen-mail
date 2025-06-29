const express = require("express");
const {
  sendLetter,
  getInbox,
  getOutbox,
  deleteLetter,
  getLetter,
} = require("../../controllers/letter/controllers");
const router = express.Router();

// Letter routes
router.post("/send-letter", sendLetter);
router.get("/get-letter/:id", getLetter);
router.delete("/delete-letter/:id", deleteLetter);

// Inbox and Outbox routes
router.get("/inbox", getInbox);
router.get("/outbox", getOutbox);

module.exports = router;
