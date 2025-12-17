const User = require("../../models/user/model");
const FriendRequest = require("../../models/friend/model");

const { generateToken } = require("../../utils/auth");
const { setCookie } = require("../../utils/cookie");
const logger = require("../../utils/logger");

const getUserProfile = async (req, res) => {
  logger.info("Fetching user profile", { userId: req.user._id });
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
    logger.error("Error fetching user profile", { userId: req.user._id, error: error.message });
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const updateUserProfile = async (req, res) => {
  logger.info("Updating user profile", { userId: req.user._id });
  try {
    const userId = req.user._id;
    const avatarUrl = req.file ? req.file.path : req.user.avatarUrl;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { ...req.body, avatarUrl },
      { new: true }
    ).select("-password");

    if (!updatedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const token = generateToken({
      _id: updatedUser._id,
      email: updatedUser.email,
      nickName: updatedUser.nickName,
      fullName: updatedUser.fullName,
      avatarUrl: updatedUser.avatarUrl,
      role: updatedUser.role,
    });
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
    logger.error("Error updating user profile", { userId: req.user._id, error: error.message });
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const connectFriend = async (req, res) => {
  logger.info("Sending friend request", { userId: req.user._id });
  try {
    const userId = req.user._id;
    const friendId = req.params.friendId || req.body.friendId;

    if (!friendId) {
      return res.status(400).json({
        success: false,
        message: "Friend ID is required",
      });
    }

    if (userId === friendId) {
      return res.status(400).json({
        success: false,
        message: "You cannot add yourself as a friend",
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.friends.includes(friendId)) {
      return res.status(400).json({
        success: false,
        message: "Already friends",
      });
    }

    const friendRequest = await FriendRequest.findOne({
      from: userId,
      to: friendId,
    });

    if (friendRequest && friendRequest.status === "pending") {
      return res.status(400).json({
        success: false,
        message: "Friend request already sent",
      });
    } else if (friendRequest && friendRequest.status === "rejected") {
      // If the request was rejected, we can allow sending a new request
      friendRequest.status = "pending";
      await friendRequest.save();
      return res.status(200).json({
        success: true,
        message: "Friend request resent successfully",
        friendRequest,
      });
    }

    const newFriendRequest = await FriendRequest.create({
      from: userId,
      to: friendId,
    });

    res.status(201).json({
      success: true,
      message: "Friend request sent successfully",
      friendRequest: newFriendRequest,
    });
  } catch (error) {
    logger.error("Error connecting friend", { userId: req.user._id, error: error.message });
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const getFriends = async (req, res) => {
  logger.info("Fetching friends", { userId: req.user._id });
  try {
    const userId = req.user._id;

    const user = await User.findById(userId)
      .populate("friends", "nickName fullName avatarUrl email")
      .select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Friends list fetched successfully",
      friends: user.friends,
    });
  } catch (error) {
    logger.error("Error fetching friends", { userId: req.user._id, error: error.message });
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const getFriendProfile = async (req, res) => {
  logger.info("Fetching friend profile", { userId: req.user._id });
  try {
    const friendId = req.params.friendId;

    if (!friendId) {
      return res.status(400).json({
        success: false,
        message: "Friend ID is required",
      });
    }

    const friend = await User.findById(friendId).select("-password");

    if (!friend) {
      return res.status(404).json({
        success: false,
        message: "Friend not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Friend profile fetched successfully",
      friend,
    });
  } catch (error) {
    logger.error("Error fetching friend profile", { error: error.message });
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const acceptFriendRequest = async (req, res) => {
  logger.info("Accepting friend request", { userId: req.user._id });
  try {
    const userId = req.user._id;
    const { requestId } = req.params || req.body;

    if (!requestId) {
      return res.status(400).json({
        success: false,
        message: "Request ID is required",
      });
    }

    const request = await FriendRequest.findById(requestId);

    if (!request || request.to.toString() !== userId.toString()) {
      return res.status(404).json({
        success: false,
        message: "Friend request not found",
      });
    }

    request.status = "accepted";
    await request.save();

    const user = await User.findById(userId);
    const friend = await User.findById(request.from);
    user.friends.push(request.from);
    friend.friends.push(userId);
    await user.save();
    await friend.save();

    await FriendRequest.findByIdAndDelete(request._id);

    res.status(200).json({
      success: true,
      message: "Friend request accepted successfully",
      friendRequest: request,
    });
  } catch (error) {
    logger.error("Error accepting friend request", { error: error.message });
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const rejectFriendRequest = async (req, res) => {
  logger.info("Rejecting friend request", { userId: req.user._id });
  try {
    const userId = req.user._id;
    const { requestId } = req.params || req.body;

    if (!requestId) {
      return res.status(400).json({
        success: false,
        message: "Request ID is required",
      });
    }

    const request = await FriendRequest.findById(requestId);

    if (!request || request.to.toString() !== userId.toString()) {
      return res.status(404).json({
        success: false,
        message: "Friend request not found",
      });
    }

    request.status = "rejected";
    await request.save();

    res.status(200).json({
      success: true,
      message: "Friend request rejected successfully",
      friendRequest: request,
    });
  } catch (error) {
    logger.error("Error rejecting friend request", { error: error.message });
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const cancelFriendRequest = async (req, res) => {
  logger.info("Canceling friend request", { userId: req.user._id });
  try {
    const userId = req.user._id;
    const { requestId } = req.params || req.body;

    if (!requestId) {
      return res.status(400).json({
        success: false,
        message: "Request ID is required",
      });
    }

    const request = await FriendRequest.findById(requestId);

    if (!request || request.from.toString() !== userId.toString()) {
      return res.status(404).json({
        success: false,
        message: "Friend request not found or you don't have permission",
      });
    }

    if (request.status !== "pending") {
      return res.status(400).json({
        success: false,
        message: "Cannot cancel a request that has already been responded to",
      });
    }

    await FriendRequest.findByIdAndDelete(requestId);

    res.status(200).json({
      success: true,
      message: "Friend request canceled successfully",
    });
  } catch (error) {
    logger.error("Error canceling friend request", { error: error.message });
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const getFriendRequests = async (req, res) => {
  logger.info("Fetching friend requests", { userId: req.user._id });
  try {
    const userId = req.user._id;

    const receivedFriendRequests = await FriendRequest.find({
      to: userId,
      status: "pending",
    })
      .populate("from", "nickName fullName avatarUrl email")
      .select("-__v");

    const sentFriendRequests = await FriendRequest.find({
      from: userId,
      status: "pending",
    })
      .populate("to", "nickName fullName avatarUrl email")
      .select("-__v");

    res.status(200).json({
      success: true,
      message: "Friend requests fetched successfully",
      requests: {
        received: receivedFriendRequests,
        sent: sentFriendRequests,
      },
    });
  } catch (error) {
    logger.error("Error fetching friend requests", { error: error.message });
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const unfriend = async (req, res) => {
  logger.info("Unfriending user", { userId: req.user._id });
  try {
    const userId = req.user._id;
    const friendId = req.params.friendId || req.body.friendId;

    if (!friendId) {
      return res.status(400).json({
        success: false,
        message: "Friend ID is required",
      });
    }

    const user = await User.findById(userId);
    const friend = await User.findById(friendId);

    if (!user || !friend) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (!user.friends.includes(friendId)) {
      return res.status(400).json({
        success: false,
        message: "Not friends with this user",
      });
    }

    // Remove from both users' friend lists
    user.friends = user.friends.filter(
      (id) => id.toString() !== friendId.toString()
    );
    friend.friends = friend.friends.filter(
      (id) => id.toString() !== userId.toString()
    );

    await user.save();
    await friend.save();

    res.status(200).json({
      success: true,
      message: "Friend removed successfully",
    });
  } catch (error) {
    logger.error("Error unfriending user", { userId: req.user._id, error: error.message });
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const getDiscoverUsers = async (req, res) => {
  logger.info("Fetching discover users", { userId: req.user._id });
  try {
    const userId = req.user._id;
    const { languages, interests, friends } = await User.findById(
      userId
    ).select("languages interests friends");

    const users = await User.find({
      $and: [
        { _id: { $ne: userId } },
        { _id: { $nin: friends } },
        { languages: { $in: languages } },
        { interests: { $in: interests } },
      ],
    }).select("_id nickName avatarUrl countryCode").limit(20);

    if (!users || users.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No users found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Discover users fetched successfully",
      users,
    });
  } catch (error) {
    logger.error("Error fetching discover users", { error: error.message });
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const blockUser = async (req, res) => {
  logger.info("Blocking user", { userId: req.user._id });
  try {
    const userId = req.user._id;
    const blockUserId = req.params.userId || req.body.userId;

    if (!blockUserId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    if (userId.toString() === blockUserId.toString()) {
      return res.status(400).json({
        success: false,
        message: "You cannot block yourself",
      });
    }

    const user = await User.findById(userId);
    const blockedUser = await User.findById(blockUserId);

    if (!user || !blockedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.blockedUsers.includes(blockUserId)) {
      return res.status(400).json({
        success: false,
        message: "User is already blocked",
      });
    }

    // Add to blocked list
    user.blockedUsers.push(blockUserId);

    // Remove from friends if they were friends
    if (user.friends.includes(blockUserId)) {
      user.friends = user.friends.filter(
        (id) => id.toString() !== blockUserId.toString()
      );
      blockedUser.friends = blockedUser.friends.filter(
        (id) => id.toString() !== userId.toString()
      );
      await blockedUser.save();
    }

    // Delete any pending friend requests
    await FriendRequest.deleteMany({
      $or: [
        { from: userId, to: blockUserId },
        { from: blockUserId, to: userId },
      ],
    });

    await user.save();

    res.status(200).json({
      success: true,
      message: "User blocked successfully",
    });
  } catch (error) {
    logger.error("Error blocking user", { error: error.message });
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const unblockUser = async (req, res) => {
  logger.info("Unblocking user", { userId: req.user._id });
  try {
    const userId = req.user._id;
    const unblockUserId = req.params.userId || req.body.userId;

    if (!unblockUserId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (!user.blockedUsers.includes(unblockUserId)) {
      return res.status(400).json({
        success: false,
        message: "User is not blocked",
      });
    }

    user.blockedUsers = user.blockedUsers.filter(
      (id) => id.toString() !== unblockUserId.toString()
    );

    await user.save();

    res.status(200).json({
      success: true,
      message: "User unblocked successfully",
    });
  } catch (error) {
    logger.error("Error unblocking user", { error: error.message });
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const getBlockedUsers = async (req, res) => {
  logger.info("Fetching blocked users", { userId: req.user._id });
  try {
    const userId = req.user._id;

    const user = await User.findById(userId)
      .populate("blockedUsers", "nickName fullName avatarUrl email")
      .select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Blocked users fetched successfully",
      blockedUsers: user.blockedUsers,
    });
  } catch (error) {
    logger.error("Error fetching blocked users", { error: error.message });
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const deleteUser = async (req, res) => {
  logger.info("Deleting user", { targetUserId: req.params.userId });
  try {
    const userId = req.user._id;

    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    logger.error("Error deleting user", { error: error.message });
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
  connectFriend,
  unfriend,
  deleteUser,
  acceptFriendRequest,
  rejectFriendRequest,
  cancelFriendRequest,
  getFriendRequests,
  getFriendProfile,
  getFriends,
  getDiscoverUsers,
  blockUser,
  unblockUser,
  getBlockedUsers,
};
