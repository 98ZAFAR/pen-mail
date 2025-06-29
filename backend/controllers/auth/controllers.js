const User = require("../../models/user/model");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../../utils/auth");

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
      return res.status(400).json({success: false, message: "All fields are required" });
    }

    const oldUser = await User.findOne({ email });
    if (oldUser) {
      return res
        .status(409)
        .json({success: false, message: "User already exists with this email" });
    }

    const existingNickName = await User.findOne({ nickName });
    if (existingNickName) {
      return res
        .status(409)
        .json({success: false, message: "User already exists with this nickname" });
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

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: newUser,
    });

  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({success: false, message: "Internal server error", error: error.message});
  }
};

const handleLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({success: false, message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({success: false, message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({success: false, message: "Invalid password" });
    }

    const token = generateToken(
      {
        _id: user._id,
        email: user.email,
        nickName: user.nickName,
        fullName: user.fullName,
        avatarUrl: user.avatarUrl,
        role: user.role,
      }
    );
    if (!token) {
      return res.status(500).json({success: false, message: "Error generating token" });
    }

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Set secure flag in production
      sameSite: "Lax", 
      maxAge: 24 * 3600000, // 24 hours
    });
    
    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      user,
      token,
    });

  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({success: false, message: "Internal server error", error: error.message});
  }
};

const handleLogout = (req, res) => {
  // Handle logout logic here, e.g., invalidate token
  res.status(200).json({success: true, message: "User logged out successfully"});
};

module.exports = {
  handleRegister,
  handleLogin,
  handleLogout,
}
