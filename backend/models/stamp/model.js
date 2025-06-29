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
    imageUrl: {
      type: String,
      required: true,
    },
    cost: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Stamp = mongoose.model("Stamp", stampSchema);

module.exports = Stamp;
