const User = require("../../models/user/model");
const logger = require("../../utils/logger");

const handleGetAllUsers = async (req, res) => {
  logger.info("Fetching all users");
  try {
    const users = await User.find().select("-password");

    if (!users || users.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No users found",
      });
    }

    logger.info(`Fetched ${users.length} users from the database.`);
    return res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      users,
    });
  } catch (error) {
    logger.error("Error fetching users", { error: error.message });
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const handleGetUserProfile = async (req, res) => {
  logger.info("Fetching user profile", { userId: req.params.userId || req.body.userId });
  try {
    const userId = req.params.userId || req.body.userId;
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User profile fetched successfully",
      user,
    });
  } catch (error) {
    logger.error("Error fetching user profile", { error: error.message });
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = {
  handleGetAllUsers,
  handleGetUserProfile,
};
