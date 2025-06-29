const express = require("express");
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
router.get("/profile", getUserProfile);
router.put("/update", upload.single("avatarUrl"), updateUserProfile);

// Friend routes
router.put("/connect-friend/:friendId", connectFriend);
router.get("/get-friends", getFriends);
router.get("/get-friends/:friendId", getFriendProfile);

// Friend request routes
router.put("/friend-request/:requestId", acceptFriendRequest);
router.delete("/friend-request/:requestId", rejectFriendRequest);
router.get("/friend-requests", getFriendRequests);

// Discover users route
router.get("/discover", getDiscoverUsers);

module.exports = router;
