const User = require("../../models/user/model");
const bcrypt = require("bcryptjs");
const { generateToken, verifyToken } = require("../../utils/auth");
const { setCookie, clearCookie } = require("../../utils/cookie");
const sendGeneralMail = require("../../services/emails/sendGeneralMail");
const sendResetPasswordMail = require("../../services/emails/sendResetPasswordMail");
const logger = require("../../utils/logger");

const handleRegister = async (req, res) => {
  try {
    const {
      fullName,
      nickName,
      email,
      password,
      countryCode,
      avatarUrl,
      languages,
      interests,
    } = req.body;

    if (!fullName || !nickName || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const oldUser = await User.findOne({ email });
    if (oldUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists with this email",
      });
    }

    const existingNickName = await User.findOne({ nickName });
    if (existingNickName) {
      return res.status(409).json({
        success: false,
        message: "User already exists with this nickname",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      fullName,
      nickName,
      email,
      password: hashedPassword,
      avatarUrl,
      countryCode,
      languages,
      interests,
    });

    await newUser.save();
    logger.success("User registered successfully", { email, nickName });

    const emailRes = await sendGeneralMail({
      to: email,
      subject: "Account Created Successfully",
      title: "Welcome to Pen Mail",
      body: "Thank you for registering with Pen Mail! We're excited to have you on board. You can now connect with people around the world, share your thoughts, and explore new cultures.",
    });

    if (!emailRes) {
      return res
        .status(500)
        .json({ success: false, message: "Error sending welcome email" });
    }

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: newUser,
    });
  } catch (error) {
    logger.error("Error registering user", { error: error.message, stack: error.stack });
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const handleLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid password" });
    }

    const token = generateToken({
      _id: user._id,
      email: user.email,
      nickName: user.nickName,
      fullName: user.fullName,
      avatarUrl: user.avatarUrl,
      role: user.role,
    });
    if (!token) {
      return res
        .status(500)
        .json({ success: false, message: "Error generating token" });
    }

    setCookie(res, token);
    logger.info("User logged in successfully", { userId: user._id, email: user.email });

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      user,
      token,
    });
  } catch (error) {
    logger.error("Error logging in user", { error: error.message, stack: error.stack });
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const handleLogout = (req, res) => {
  try {
    clearCookie(res);
    logger.info("User logged out");

    res
      .status(200)
      .json({ success: true, message: "User logged out successfully" });
  } catch (error) {
    logger.error("Error logging out user", { error: error.message });
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const handleForgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Email is required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const token = generateToken(
      { _id: user._id, email: user.email },
      "1h"
    );

    logger.debug("Generated token for forgot password", { email });
    if (!token) {
      return res
        .status(500)
        .json({ success: false, message: "Error generating token" });
    }

    const emailRes = await sendResetPasswordMail({
      to: email,
      token: token,
      userName: user.fullName || user.nickName,
    });

    if (!emailRes) {
      return res.status(500).json({
        success: false,
        message: "Error sending reset password email",
      });
    }

    res.status(200).json({
      success: true,
      message: "Reset password email sent successfully",
    });
  } catch (error) {
    logger.error("Error in forgot password", { error: error.message, stack: error.stack });
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const handleResetPassword = async (req, res) => {
  try {
    const { newPassword } = req.body;
    const token = req.params.token || req.query.token;

    if (!token || !newPassword) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid or expired token" });
    }

    const user = await User.findById(decoded._id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    logger.success("Password reset successfully", { userId: user._id, email: user.email });

    res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    logger.error("Error resetting password", { error: error.message, stack: error.stack });
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = {
  handleRegister,
  handleLogin,
  handleLogout,
  handleForgotPassword,
  handleResetPassword,
};
