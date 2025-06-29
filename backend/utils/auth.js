const jwt = require('jsonwebtoken');

const generateToken = (payload, expiresIn = '24h')=>{
  try {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
  } catch (error) {
    console.error("Error generating token:", error);
    return null;
  }
}

const verifyToken = (token)=>{
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null;
  }
}

module.exports = {
  generateToken,
  verifyToken
}