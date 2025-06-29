const mongoose = require("mongoose");

const stampSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    rarity: {
      type: String,
      enum: ["common", "uncommon", "rare", "epic", "legendary"],
      required: true,
      default: "common",
    },
    description: {
      type: String,
      required: true,
      maxlength: 500, // Limit description length
    },
    imageUrl: {
      type: String,
      required: true,
    },
    countryCode: {
      type: String,
      required: true,
      default: "global",
    },
  },
  { timestamps: true }
);

const Stamp = mongoose.model("Stamp", stampSchema);

module.exports = Stamp;
