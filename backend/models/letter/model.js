const mongoose = require("mongoose");

const letterSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  stampId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Stamp",
  },
  subject: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["draft", "sent", "received", "read", "archived"],
    default: "sent",
  },
  isArchived: {
    type: Boolean,
    default: false,
  },
  deliveredAt: {
    type: Date,
  },
}, {timestamps: true});

const Letter = mongoose.model("Letter", letterSchema);

module.exports = Letter;
