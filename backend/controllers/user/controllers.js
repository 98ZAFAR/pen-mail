const User = require("../../models/user/model");
const { generateToken } = require("../../utils/auth");
const { setCookie } = require("../../utils/cookie");

const getUserProfile = async (req, res) => {
  console.log("Fetching user profile...");
  try {
    const userId = req.user._id;
    const user = await User.findById(userId).select("-password"); // Exclude password from response

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      message: "User profile fetched successfully",
      user,
    });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const updateUserProfile = async (req, res) => {
  console.log("Updating user profile...");
  try {
    const userId = req.user._id;
    const avatarUrl = req.file ? req.file.path : req.user.avatarUrl;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { ...req.body, avatarUrl},
      { new: true }
    ).select("-password");

    if (!updatedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const token = generateToken(
      {
        _id: updatedUser._id,
        email: updatedUser.email,
        nickName: updatedUser.nickName,
        fullName: updatedUser.fullName,
        avatarUrl: updatedUser.avatarUrl,
        role: updatedUser.role,
      }
    );
    if (!token) {
      return res.status(500).json({
        success: false,
        message: "Error generating token",
      });
    }

    setCookie(res, token);

    res.status(201).json({
      success: true,
      message: "User profile updated successfully",
      user: updatedUser,
    });

    
  } catch (error) {
    console.error("Error updating user profile:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = {
  getUserProfile,
  updateUserProfile,
};
