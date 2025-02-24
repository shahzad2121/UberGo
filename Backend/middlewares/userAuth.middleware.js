const userModel = require("../src/models/user/user.mongo");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const blackListModel = require("../src/models/blacklistToken.model");

async function authenticateUser(req, res, next) {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  if (!token) {
    res.status(401).json({ message: "user is not authorized" });
  }
  const isBlacklistToken = await blackListModel.findOne({ token });
  if (isBlacklistToken){    
    res.status(401).json({message: 'Unauthorized User'})
  }
  try {
    const decoded = jwt.verify(token, "your_security");
    const user = await userModel.findById(decoded._id);
    req.user = user;
    return next();
  } catch (error) {
    return res.status(401).json({ message: "user is not authorized" });
  }
}

module.exports = authenticateUser;
