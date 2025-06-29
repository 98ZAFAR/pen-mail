const Letter = require("../../models/letter/model");
const Stamp = require("../../models/stamp/model");
const User = require("../../models/user/model");
const CalculateDelay = require("../../utils/calcDelay");

const sendLetter = async (req, res) => {
  try {
    const { recipientId, body, subject, stampId } = req.body;
    const senderId = req.user._id;

    if (!recipientId || !body || !subject) {
      return res.status(400).json({
        success: false,
        message: "Recipient ID, subject, and body are required",
      });
    }

    const recipient = await User.findById(recipientId);
    if (!recipient) {
      return res
        .status(404)
        .json({ success: false, message: "Recipient not found." });
    }

    const newLetter = new Letter({
      sender: senderId,
      recipient: recipientId,
      body,
      subject,
      status: "sent",
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

    newLetter.deliveredAt = new Date(
      Date.now() + CalculateDelay(req.user.countryCode, recipient.countryCode)
    );
    await newLetter.save();

    console.log(
      `Letter sent to ${recipientId}: ${body} (Subject: ${subject}, Stamp ID: ${stampId})`
    );

    if (stampId) {
      await User.findByIdAndUpdate(senderId,{
          $addToSet: { collectedStamps: stampId },
        },
      ).catch((error) => {
        console.error("Error updating user's collected stamps:", error);
        return res.status(500).json({
          success: false,
          message: "Internal server error while updating stamps.",
        });
      });
    }
    res
      .status(200)
      .json({ success: true, message: "Letter sent successfully!" });
  } catch (error) {
    console.error("Error sending letter:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

const getInbox = async (req, res) => {
  try {
    const userId = req.user._id;
    const letters = await Letter.find({
      recipient: userId,
      status: { $ne: "sent" },
    });
    if (!letters || letters.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No letters found in inbox." });
    }
    await Letter.populate(letters, {
      path: "sender",
      select: "nickname avatarUrl email countryCode",
      sort: { deliveredAt: -1 },
    });
    res
      .status(200)
      .json({ success: true, message: "Inbox fetched successfully.", letters });
  } catch (error) {
    console.error("Error fetching inbox:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

const getOutbox = async (req, res) => {
  try {
    const userId = req.user._id;
    const letters = await Letter.find({ sender: userId });

    if (!letters || letters.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No letters found in outbox." });
    }
    await Letter.populate(letters, {
      path: "recipient",
      select: "nickname avatarUrl email countryCode",
      sort: { deliveredAt: -1 },
    });

    res.status(200).json({
      success: true,
      message: "Outbox fetched successfully.",
      letters,
    });
  } catch (error) {
    console.error("Error fetching outbox:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

const getLetter = async (req, res) => {
  try {
    const letterId = req.params.id;
    const letter = await Letter.findById(letterId)
      .populate("sender", "nickname avatarUrl email countryCode")
      .populate("recipient", "nickname avatarUrl email countryCode");

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
    console.error("Error fetching letter:", error);
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

    console.log(`Letter with ID ${letterId} deleted successfully.`);

    res
      .status(200)
      .json({ success: true, message: "Letter deleted successfully." });
  } catch (error) {
    console.error("Error deleting letter:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

module.exports = {
  sendLetter,
  getInbox,
  getOutbox,
  getLetter,
  deleteLetter,
};
