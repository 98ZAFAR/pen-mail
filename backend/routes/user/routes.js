const express = require("express");
const { ValidateUser } = require("../../middlewares/auth/verifyUser");
const {
  getUserProfile,
  updateUserProfile,
  getFriends,
  getFriendProfile,
  connectFriend,
  acceptFriendRequest,
  rejectFriendRequest,
  getFriendRequests,
  getDiscoverUsers,
} = require("../../controllers/user/controllers");
const upload = require("../../middlewares/cloud/upload");
const router = express.Router();

// User routes
router.get("/profile", ValidateUser, getUserProfile);
router.put(
  "/update",
  ValidateUser,
  upload.single("avatarUrl"),
  updateUserProfile
);

// Friend routes
router.put("/connect-friend/:friendId", ValidateUser, connectFriend);
router.get("/get-friends", ValidateUser, getFriends);
router.get("/get-friends/:friendId", ValidateUser, getFriendProfile);

// Friend request routes
router.put("/friend-request/:requestId", ValidateUser, acceptFriendRequest);
router.delete("/friend-request/:requestId", ValidateUser, rejectFriendRequest);
router.get("/friend-requests", ValidateUser, getFriendRequests);

// Discover users route
router.get("/discover", ValidateUser, getDiscoverUsers);

module.exports = router;
