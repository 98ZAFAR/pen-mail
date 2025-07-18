const mongoose = require("mongoose");

const friendRequestSchema = new mongoose.Schema({
  from: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  to: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending",
  },
  sentAt: {
    type: Date,
    default: Date.now,
  },
  respondedAt: Date,
});

module.exports = mongoose.model("FriendRequest", friendRequestSchema);
