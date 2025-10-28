const express = require("express");
const {
  getUserProfile,
  updateUserProfile,
  getFriends,
  getFriendProfile,
  connectFriend,
  unfriend,
  acceptFriendRequest,
  rejectFriendRequest,
  cancelFriendRequest,
  getFriendRequests,
  getDiscoverUsers,
  blockUser,
  unblockUser,
  getBlockedUsers,
} = require("../../controllers/user/controllers");
const upload = require("../../middlewares/cloud/upload");
const { friendRequestLimiter } = require("../../middlewares/rateLimiter");
const {
  userIdValidation,
  updateProfileValidation,
  requestIdValidation,
} = require("../../middlewares/validation/userValidation");
const validateRequest = require("../../middlewares/validation/validateRequest");
const router = express.Router();

// User routes
router.get("/profile", getUserProfile);
router.put("/update", upload.single("avatarUrl"), updateProfileValidation, validateRequest, updateUserProfile);

// Friend routes
router.put("/connect-friend/:friendId", friendRequestLimiter, userIdValidation, validateRequest, connectFriend);
router.delete("/unfriend/:friendId", userIdValidation, validateRequest, unfriend);
router.get("/get-friends", getFriends);
router.get("/get-friends/:friendId", userIdValidation, validateRequest, getFriendProfile);

// Friend request routes
router.put("/friend-request/:requestId", requestIdValidation, validateRequest, acceptFriendRequest);
router.delete("/friend-request/:requestId", requestIdValidation, validateRequest, rejectFriendRequest);
router.delete("/friend-request/cancel/:requestId", requestIdValidation, validateRequest, cancelFriendRequest);
router.get("/friend-requests", getFriendRequests);

// Block routes
router.put("/block/:userId", userIdValidation, validateRequest, blockUser);
router.delete("/unblock/:userId", userIdValidation, validateRequest, unblockUser);
router.get("/blocked-users", getBlockedUsers);

// Discover users route
router.get("/discover", getDiscoverUsers);

module.exports = router;
