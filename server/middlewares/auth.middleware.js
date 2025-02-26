const { userModel } = require("../src/models/user/user.mongo");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const blackListModel = require("../src/models/blacklistToken.model");
const { captainModel } = require("../src/models/captain/captain.mongo");

async function authenticateUser(req, res, next) {
  // Extract token
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  console.log("Extracted Token:", token); // Debug
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  // Check blacklist
  const isBlacklistToken = await blackListModel.findOne({ token });
  console.log("Blacklisted:", isBlacklistToken); // Debug
  if (isBlacklistToken) {
    return res.status(401).json({ message: "Token is blacklisted" });
  }

  try {
    const decoded = jwt.verify(token, "your_security");
    const user = await userModel.findById(decoded._id);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    req.user = user;
    return next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}
async function authenticateCaptain(req, res, next) {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Captain is not authorized" });
  }
  const isBlacklistToken = await blackListModel.findOne({ token });
  if (isBlacklistToken) {
    return res.status(401).json({ message: "Unauthorized User" });
  }
  try {
    const decoded = jwt.verify(token, "your_secret");
    const captain = await captainModel.findById(decoded._id);
    
    req.captain = captain;
    return next();
  } catch (error) {
    return res.status(401).json(error);
  }
}

module.exports = { authenticateUser, authenticateCaptain };
