const User = require("../../models/user/model");
const FriendRequest = require("../../models/friend/model");

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
    console.error("Error updating user profile:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const connectFriend = async (req, res) => {
  console.log("Connecting friend...");
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
    console.error("Error adding friend:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const getFriends = async (req, res) => {
  console.log("Fetching friends list...");
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
    console.error("Error fetching friends list:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const getFriendProfile = async (req, res) => {
  console.log("Fetching friend profile...");
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
    console.error("Error fetching friend profile:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const acceptFriendRequest = async (req, res) => {
  console.log("Accepting friend request...");
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
    console.error("Error accepting friend request:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const rejectFriendRequest = async (req, res) => {
  console.log("Rejecting friend request...");
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
    console.error("Error rejecting friend request:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const getFriendRequests = async (req, res) => {
  console.log("Fetching friend requests...");
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
    console.error("Error fetching friend requests:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const getDiscoverUsers = async (req, res) => {
  console.log("Fetching discover users...");
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
    console.error("Error fetching discover users:", error);
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
  acceptFriendRequest,
  rejectFriendRequest,
  getFriendRequests,
  getFriendProfile,
  getFriends,
  getDiscoverUsers,
};
