const { validationResult } = require("express-validator");


const { userModel } = require("../../models/user/user.mongo");
const blackListModel = require("../../models/blacklistToken.model");

async function httpCreateNewUser(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const user = req.body;
  if (!user.email || !user.name || !user.password) {
    throw new Error("something is missing");
  }
  try {
    const { email, name, password } = user;
    const userAlreadyExists = await userModel.findOne({ email });
    if (userAlreadyExists) {
      return res.status(400).json("User already exists");
    }

    const hashedPassword = await userModel.hashPassword(password);
    const newUser = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = await newUser.generateAuthToken();

    return res
      .status(201)
      .json({ message: "user created successfully",success:true,    newUser, token });
  } catch (error) {
    console.error("error creating new user", error);
    return res.status(500).json({ error: "internal server error" });
  }
}

async function httpLoginUser(req, res) {
  try {
    // Validation check
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Extract email and password
    const { email, password } = req.body;

    // Find user and include password field
    const user = await userModel.findOne({ email }).select("+password");
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate token
    const token = user.generateAuthToken();
    if (!token) {
      return res.status(500).json({ message: "Failed to generate token" });
    }

    // Set cookie (optional, configure as needed)
    res.cookie("token", token);

    // Send response
    return res.status(200).json({ token, user });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Server error during login" });
  }
}
async function httpGetProfile(req, res) {
  return res.status(200).json(req.user);
}
async function httpLogOutUser(req, res) {
  res.clearCookie("token");
  const token = req.cookies.token || req.headers.authorization.split(" ")[1];

  await blackListModel.create({ token })
  return res.status(200).json({ message: "Logged Out Successfully" });
}

module.exports = {
  httpCreateNewUser,
  httpLoginUser,
  httpGetProfile,
  httpLogOutUser,
};


