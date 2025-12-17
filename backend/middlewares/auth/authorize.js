const logger = require("../../utils/logger");

const AuthorizeAdmin = (req, res, next) => {
  try {
    const userRole = req.user.role; // Assuming req.user is populated with the authenticated user's info
  
    if (userRole !== "admin") {
      return res.status(403).json({ success: false, message: "Access denied" });
    }
  
    next();
  } catch (error) {
    logger.error("Authorization error", { error: error.message, userId: req.user?.id });
    return res.status(500).json({ success: false, message: "Internal server error" });
    
  }
};

module.exports = AuthorizeAdmin;
