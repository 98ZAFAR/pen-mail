const express = require("express");
const {
  sendLetter,
  getInbox,
  getOutbox,
  deleteLetter,
  getLetter,
  getDrafts,
  updateDraft,
  sendDraft,
  archiveLetter,
  unarchiveLetter,
  getArchivedLetters,
} = require("../../controllers/letter/controllers");
const { letterLimiter } = require("../../middlewares/rateLimiter");
const {
  sendLetterValidation,
  letterIdValidation,
} = require("../../middlewares/validation/letterValidation");
const validateRequest = require("../../middlewares/validation/validateRequest");
const router = express.Router();

// Letter routes
router.post("/send-letter", letterLimiter, sendLetterValidation, validateRequest, sendLetter);
router.get("/get-letter/:id", letterIdValidation, validateRequest, getLetter);
router.delete("/delete-letter/:id", letterIdValidation, validateRequest, deleteLetter);

// Draft routes
router.get("/drafts", getDrafts);
router.put("/draft/:id", letterIdValidation, validateRequest, updateDraft);
router.post("/draft/:id/send", letterIdValidation, validateRequest, sendDraft);

// Archive routes
router.put("/archive/:id", letterIdValidation, validateRequest, archiveLetter);
router.put("/unarchive/:id", letterIdValidation, validateRequest, unarchiveLetter);
router.get("/archived", getArchivedLetters);

// Inbox and Outbox routes
router.get("/inbox", getInbox);
router.get("/outbox", getOutbox);

module.exports = router;
