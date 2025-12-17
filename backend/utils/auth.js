const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const RefreshToken = require("../models/refreshToken/model");
const logger = require("./logger");

const generateToken = (payload, expiresIn = "24h") => {
  try {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
  } catch (error) {
    logger.error("Error generating token", { error: error.message });
    return null;
  }
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null;
  }
};

const generateRefreshToken = async (userId, userAgent, ipAddress) => {
  try {
    // Generate a random token
    const token = crypto.randomBytes(64).toString("hex");

    // Set expiration (7 days from now)
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    // Create refresh token in database
    const refreshToken = await RefreshToken.create({
      userId,
      token,
      expiresAt,
      userAgent,
      ipAddress,
    });

    return token;
  } catch (error) {
    logger.error("Error generating refresh token", { error: error.message });
    return null;
  }
};

const verifyRefreshToken = async (token) => {
  try {
    const refreshToken = await RefreshToken.findOne({
      token,
      isRevoked: false,
      expiresAt: { $gt: new Date() },
    }).populate("userId");

    if (!refreshToken) {
      return null;
    }

    return refreshToken;
  } catch (error) {
    logger.error("Error verifying refresh token", { error: error.message });
    return null;
  }
};

const revokeRefreshToken = async (token) => {
  try {
    await RefreshToken.updateOne({ token }, { isRevoked: true });
    return true;
  } catch (error) {
    logger.error("Error revoking refresh token", { error: error.message });
    return false;
  }
};

const revokeAllUserTokens = async (userId) => {
  try {
    await RefreshToken.updateMany({ userId }, { isRevoked: true });
    return true;
  } catch (error) {
    logger.error("Error revoking all user tokens", { error: error.message });
    return false;
  }
};

module.exports = {
  generateToken,
  verifyToken,
  generateRefreshToken,
  verifyRefreshToken,
  revokeRefreshToken,
  revokeAllUserTokens,
};