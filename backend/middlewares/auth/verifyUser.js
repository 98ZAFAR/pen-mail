const { verifyToken } = require("../../utils/auth");
const logger = require("../../utils/logger");

const ValidateUser = (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized access" });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return res.status(401).json({ success: false, message: "Invalid token" });
    }

    req.user = decoded; // Attach user info to request
    next();
  } catch (error) {
    logger.error("Token verification error", { error: error.message });
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

module.exports = { ValidateUser };
