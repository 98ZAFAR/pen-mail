const Stamp = require("../../models/stamp/model");
const User = require("../../models/user/model");
const logger = require("../../utils/logger");

const createStamp = async (req, res) => {
  try {
    const { name, description } = req.body;
    const { rarity, countryCode } = req.body || {};
    const imageUrl = req.file?.path;

    if (!name || !description || !imageUrl) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required." });
    }

    const newStamp = new Stamp({
      name,
      description,
      imageUrl,
      rarity,
      countryCode,
    });
    await newStamp.save();

    res.status(201).json({
      success: true,
      message: "Stamp created successfully.",
      stamp: newStamp,
    });
  } catch (error) {
    logger.error("Error creating stamp", { error: error.message });
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

const editStamp = async (req, res) => {
  try {
    const { stampId } = req.params;
    const { name, description, rarity, countryCode } = req.body;
    const imageUrl = req.file?.path;

    const updatedStamp = await Stamp.findByIdAndUpdate(
      stampId,
      {
        name,
        description,
        rarity,
        countryCode,
      },
      { new: true }
    );
    
    if (!updatedStamp) {
        return res
        .status(404)
        .json({ success: false, message: "Stamp not found." });
    }

    //Update imageUrl only if it exists
    if (imageUrl) {
      updatedStamp.imageUrl = imageUrl;
    }
    await updatedStamp.save();
    
    res.status(200).json({
      success: true,
      message: "Stamp updated successfully.",
      stamp: updatedStamp,
    });
  } catch (error) {
    logger.error("Error updating stamp", { error: error.message });
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

const deleteStamp = async (req, res) => {
  try {
    const { stampId } = req.params;

    const deletedStamp = await Stamp.findByIdAndDelete(stampId);
    if (!deletedStamp) {
      return res
        .status(404)
        .json({ success: false, message: "Stamp not found." });
    }

    res.status(200).json({
      success: true,
      message: "Stamp deleted successfully.",
    });
  } catch (error) {
    logger.error("Error deleting stamp", { error: error.message });
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

const getAllStamps = async (req, res) => {
  try {
    const { rarity, countryCode } = req.query; // You can use query parameters to filter or sort if needed
    const filter = {};

    if (countryCode) filter.countryCode = { $in: [countryCode, "global"] };
    if (rarity) filter.rarity = rarity;

    const stamps = await Stamp.find(filter).sort({ createdAt: -1 });
    if (!stamps || stamps.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No stamps found." });
    }
    res
      .status(200)
      .json({ success: true, message: "Stamps fetched successfully.", stamps });
  } catch (error) {
    logger.error("Error fetching stamps", { error: error.message });
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

const collectStamp = async (req, res) => {
  try {
    const userId = req.user._id;
    const { stampId } = req.params || req.body; // Stamp ID to be collected

    if (!userId || !stampId) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid input." });
    }

    // Find the user and add the stamp to their collectedStamps
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    user.collectedStamps.push(stampId);
    await user.save();

    res
      .status(200)
      .json({ success: true, message: "Stamp collected successfully." });
  } catch (error) {
    logger.error("Error collecting stamp", { userId: req.user._id, error: error.message });
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

const getMyStamps = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId).populate("collectedStamps");

    if (!user || !user.collectedStamps || user.collectedStamps.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No stamps collected." });
    }

    res.status(200).json({
      success: true,
      message: "Collected stamps fetched successfully.",
      stamps: user.collectedStamps,
    });
  } catch (error) {
    logger.error("Error fetching user's stamps", { userId: req.user._id, error: error.message });
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

module.exports = {
  createStamp,
  editStamp,
  deleteStamp,
  getAllStamps,
  collectStamp,
  getMyStamps,
};
