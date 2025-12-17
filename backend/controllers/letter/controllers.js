const Letter = require("../../models/letter/model");
const Stamp = require("../../models/stamp/model");
const User = require("../../models/user/model");
const CalculateDelay = require("../../utils/calcDelay");
const logger = require("../../utils/logger");

const sendLetter = async (req, res) => {
  try {
    const { recipientId, body, subject, stampId, isDraft } = req.body;
    const senderId = req.user._id;

    if (!body || !subject) {
      return res.status(400).json({
        success: false,
        message: "Subject and body are required",
      });
    }

    // If it's a draft, recipient is optional
    if (!isDraft && !recipientId) {
      return res.status(400).json({
        success: false,
        message: "Recipient ID is required for sending a letter",
      });
    }

    // Check if recipient exists and is not blocked
    if (recipientId) {
      const recipient = await User.findById(recipientId);
      if (!recipient) {
        return res
          .status(404)
          .json({ success: false, message: "Recipient not found." });
      }

      // Check if sender is blocked by recipient
      if (recipient.blockedUsers && recipient.blockedUsers.includes(senderId)) {
        return res.status(403).json({
          success: false,
          message: "You cannot send letters to this user.",
        });
      }
    }

    const newLetter = new Letter({
      sender: senderId,
      recipient: recipientId,
      body,
      subject,
      status: isDraft ? "draft" : "sent",
    });

    if (stampId) {
      const stamp = await Stamp.findById(stampId);
      if (!stamp) {
        return res
          .status(404)
          .json({ success: false, message: "Stamp not found." });
      }
      newLetter.stampId = stampId;
    }

    if (!isDraft && recipientId) {
      const recipient = await User.findById(recipientId);
      newLetter.deliveredAt = new Date(
        Date.now() + CalculateDelay(req.user.countryCode, recipient.countryCode)
      );
    }

    await newLetter.save();

    if (isDraft) {
      logger.info("Draft saved", { senderId, subject });
    } else {
      logger.success("Letter sent", { senderId, recipientId, subject, stampId });
    }

    if (stampId && !isDraft) {
      await User.findByIdAndUpdate(
        senderId,
        {
          $addToSet: { collectedStamps: stampId },
        }
      ).catch((error) => {
        logger.error("Error updating user's collected stamps", { error: error.message });
        return res.status(500).json({
          success: false,
          message: "Internal server error while updating stamps.",
        });
      });
    }

    res.status(200).json({
      success: true,
      message: isDraft ? "Draft saved successfully!" : "Letter sent successfully!",
      letter: newLetter,
    });
  } catch (error) {
    logger.error("Error sending letter", { error: error.message, senderId: req.user._id });
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

const getInbox = async (req, res) => {
  try {
    const userId = req.user._id;
    const { page = 1, limit = 10, search, startDate, endDate } = req.query;

    // Build filter
    const filter = {
      recipient: userId,
      status: { $ne: "sent" },
      isArchived: false,
    };

    // Add search filter
    if (search) {
      filter.$or = [
        { subject: { $regex: search, $options: "i" } },
        { body: { $regex: search, $options: "i" } },
      ];
    }

    // Add date range filter
    if (startDate || endDate) {
      filter.deliveredAt = {};
      if (startDate) filter.deliveredAt.$gte = new Date(startDate);
      if (endDate) filter.deliveredAt.$lte = new Date(endDate);
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const total = await Letter.countDocuments(filter);

    const letters = await Letter.find(filter)
      .populate("sender", "nickName avatarUrl email countryCode")
      .sort({ deliveredAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    if (!letters || letters.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No letters found in inbox." });
    }

    res.status(200).json({
      success: true,
      message: "Inbox fetched successfully.",
      letters,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (error) {
    logger.error("Error fetching inbox", { userId: req.user._id, error: error.message });
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

const getOutbox = async (req, res) => {
  try {
    const userId = req.user._id;
    const { page = 1, limit = 10, search, startDate, endDate } = req.query;

    // Build filter
    const filter = {
      sender: userId,
      status: { $ne: "draft" },
      isArchived: false,
    };

    // Add search filter
    if (search) {
      filter.$or = [
        { subject: { $regex: search, $options: "i" } },
        { body: { $regex: search, $options: "i" } },
      ];
    }

    // Add date range filter
    if (startDate || endDate) {
      filter.createdAt = {};
      if (startDate) filter.createdAt.$gte = new Date(startDate);
      if (endDate) filter.createdAt.$lte = new Date(endDate);
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const total = await Letter.countDocuments(filter);

    const letters = await Letter.find(filter)
      .populate("recipient", "nickName avatarUrl email countryCode")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    if (!letters || letters.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No letters found in outbox." });
    }

    res.status(200).json({
      success: true,
      message: "Outbox fetched successfully.",
      letters,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (error) {
    logger.error("Error fetching outbox", { userId: req.user._id, error: error.message });
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

const getLetter = async (req, res) => {
  try {
    const letterId = req.params.id;
    const letter = await Letter.findById(letterId)
      .populate("sender", "nickName avatarUrl email countryCode")
      .populate("recipient", "nickName avatarUrl email countryCode");

    if (!letter) {
      return res
        .status(404)
        .json({ success: false, message: "Letter not found." });
    }

    if (
      letter.status === "received" &&
      letter.recipient._id.toString() === req.user._id.toString()
    ) {
      letter.status = "read";
      await letter.save();
    }
    res
      .status(200)
      .json({ success: true, message: "Letter fetched successfully.", letter });
  } catch (error) {
    logger.error("Error fetching letter", { userId: req.user._id, error: error.message });
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

const getDrafts = async (req, res) => {
  try {
    const userId = req.user._id;
    const { page = 1, limit = 10 } = req.query;

    const filter = {
      sender: userId,
      status: "draft",
    };

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const total = await Letter.countDocuments(filter);

    const letters = await Letter.find(filter)
      .sort({ updatedAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    res.status(200).json({
      success: true,
      message: "Drafts fetched successfully.",
      letters,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (error) {
    logger.error("Error fetching drafts", { userId: req.user._id, error: error.message });
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

const updateDraft = async (req, res) => {
  try {
    const letterId = req.params.id;
    const { recipientId, body, subject, stampId } = req.body;
    const userId = req.user._id;

    const letter = await Letter.findById(letterId);

    if (!letter) {
      return res
        .status(404)
        .json({ success: false, message: "Draft not found." });
    }

    if (letter.sender.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: "You do not have permission to edit this draft.",
      });
    }

    if (letter.status !== "draft") {
      return res.status(400).json({
        success: false,
        message: "Only drafts can be edited.",
      });
    }

    // Update fields
    if (recipientId) letter.recipient = recipientId;
    if (body) letter.body = body;
    if (subject) letter.subject = subject;
    if (stampId) letter.stampId = stampId;

    await letter.save();

    res.status(200).json({
      success: true,
      message: "Draft updated successfully.",
      letter,
    });
  } catch (error) {
    logger.error("Error updating draft", { userId: req.user._id, error: error.message });
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

const sendDraft = async (req, res) => {
  try {
    const letterId = req.params.id;
    const userId = req.user._id;
    const { recipientId } = req.body;

    const letter = await Letter.findById(letterId);

    if (!letter) {
      return res
        .status(404)
        .json({ success: false, message: "Draft not found." });
    }

    if (letter.sender.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: "You do not have permission to send this draft.",
      });
    }

    if (letter.status !== "draft") {
      return res.status(400).json({
        success: false,
        message: "Only drafts can be sent.",
      });
    }

    const finalRecipientId = recipientId || letter.recipient;

    if (!finalRecipientId) {
      return res.status(400).json({
        success: false,
        message: "Recipient ID is required to send the letter.",
      });
    }

    const recipient = await User.findById(finalRecipientId);
    if (!recipient) {
      return res
        .status(404)
        .json({ success: false, message: "Recipient not found." });
    }

    // Check if sender is blocked by recipient
    if (recipient.blockedUsers && recipient.blockedUsers.includes(userId)) {
      return res.status(403).json({
        success: false,
        message: "You cannot send letters to this user.",
      });
    }

    letter.recipient = finalRecipientId;
    letter.status = "sent";
    letter.deliveredAt = new Date(
      Date.now() + CalculateDelay(req.user.countryCode, recipient.countryCode)
    );

    await letter.save();

    // Collect stamp if used
    if (letter.stampId) {
      await User.findByIdAndUpdate(userId, {
        $addToSet: { collectedStamps: letter.stampId },
      });
    }

    res.status(200).json({
      success: true,
      message: "Draft sent successfully!",
      letter,
    });
  } catch (error) {
    logger.error("Error sending draft", { userId: req.user._id, error: error.message });
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

const archiveLetter = async (req, res) => {
  try {
    const letterId = req.params.id;
    const userId = req.user._id;

    const letter = await Letter.findById(letterId);

    if (!letter) {
      return res
        .status(404)
        .json({ success: false, message: "Letter not found." });
    }

    // Only recipient can archive received letters, sender can archive sent letters
    if (
      letter.recipient.toString() !== userId.toString() &&
      letter.sender.toString() !== userId.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "You do not have permission to archive this letter.",
      });
    }

    letter.isArchived = true;
    await letter.save();

    res.status(200).json({
      success: true,
      message: "Letter archived successfully.",
    });
  } catch (error) {
    logger.error("Error archiving letter", { userId: req.user._id, error: error.message });
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

const unarchiveLetter = async (req, res) => {
  try {
    const letterId = req.params.id;
    const userId = req.user._id;

    const letter = await Letter.findById(letterId);

    if (!letter) {
      return res
        .status(404)
        .json({ success: false, message: "Letter not found." });
    }

    if (
      letter.recipient.toString() !== userId.toString() &&
      letter.sender.toString() !== userId.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "You do not have permission to unarchive this letter.",
      });
    }

    letter.isArchived = false;
    await letter.save();

    res.status(200).json({
      success: true,
      message: "Letter unarchived successfully.",
    });
  } catch (error) {
    logger.error("Error unarchiving letter", { userId: req.user._id, error: error.message });
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

const getArchivedLetters = async (req, res) => {
  try {
    const userId = req.user._id;
    const { page = 1, limit = 10 } = req.query;

    const filter = {
      $or: [{ sender: userId }, { recipient: userId }],
      isArchived: true,
    };

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const total = await Letter.countDocuments(filter);

    const letters = await Letter.find(filter)
      .populate("sender", "nickName avatarUrl email countryCode")
      .populate("recipient", "nickName avatarUrl email countryCode")
      .sort({ updatedAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    res.status(200).json({
      success: true,
      message: "Archived letters fetched successfully.",
      letters,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (error) {
    logger.error("Error fetching archived letters", { userId: req.user._id, error: error.message });
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

const deleteLetter = async (req, res) => {
  try {
    const letterId = req.params.id;

    const letter = await Letter.findById(letterId);

    if (!letter) {
      return res
        .status(404)
        .json({ success: false, message: "Letter not found." });
    }

    if (letter.sender.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You do not have permission to delete this letter.",
      });
    }

    await Letter.findByIdAndDelete(letterId);

    logger.success("Letter deleted successfully", { letterId, userId: req.user._id });

    res
      .status(200)
      .json({ success: true, message: "Letter deleted successfully." });
  } catch (error) {
    logger.error("Error deleting letter", { userId: req.user._id, error: error.message });
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

module.exports = {
  sendLetter,
  getInbox,
  getOutbox,
  getLetter,
  deleteLetter,
  getDrafts,
  updateDraft,
  sendDraft,
  archiveLetter,
  unarchiveLetter,
  getArchivedLetters,
};
