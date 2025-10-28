const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    nickName: {
      type: String,
      required: true,
      unique: true,
      match: /^[a-zA-Z0-9_]{3,20}$/, // 3 to 20 characters
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /.+\@.+\..+/, // Basic email validation
    },
    password: {
      type: String,
      required: true,
    },

    avatarUrl: {
      type: String,
      default: "",
    },
    countryCode: {
      type: String,
      enum: [
        "US",
        "CA",
        "GB",
        "AU",
        "IN",
        "FR",
        "DE",
        "IT",
        "ES",
        "NL",
        "BR",
        "JP",
        "CN",
        "RU",
      ],
      required: true,
      match: /^[A-Z]{2}$/, // Two-letter country code
    },
    languages: {
      type: [String],
      default: ["en"], // Default to English
      validate: {
        validator: function (v) {
          return v.length <= 5; // Limit to 5 languages
        },
        message: "Languages cannot exceed 5 items.",
      },
    },
    interests: {
      type: [String],
      default: [],
      validate: {
        validator: function (v) {
          return v.length <= 10; // Limit to 10 interests
        },
        message: "Interests cannot exceed 10 items.",
      },
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user", // Default role is user
    },
    friends: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    collectedStamps: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Stamp",
      },
    ],
    blockedUsers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
