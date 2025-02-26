const { validationResult } = require("express-validator");

const { userModel } = require("../../models/user/user.mongo");
const blackListModel = require("../../models/blacklistToken.model");

async function httpCreateNewUser(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, name, password } = req.body;
  if (!email || !name || !password) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const userAlreadyExists = await userModel.findOne({ email });
    if (userAlreadyExists) {
      return res.status(400).json({ error: "User already exists" });
    }

    // ✅ Create user in DB first before generating token
    const hashedPassword = await userModel.hashPassword(password);
    const newUser = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });
    const token = await newUser.generateAuthToken();

    return res
      .status(201)
      .json({ message: "User created successfully", user: newUser, token });
  } catch (error) {
    console.error("Error creating new user:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function httpLoginUser(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  const user = await userModel.findOne({ email }).select("+password");

  if (!user) {
    return res.status(400).json({ error: "Invalid Email or Password" });
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return res.status(400).json({ error: "Invalid Email or Password" });
  }

  const token = await user.generateAuthToken();

  // ✅ Set HTTP-only and Secure flag
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });

  return res.status(200).json({ token, user });
}

async function httpGetProfile(req, res) {
  return res.status(200).json(req.user);
}

async function httpLogOutUser(req, res) {
  res.clearCookie("token");

  const token =
    req.cookies.token ||
    (req.headers.authorization
      ? req.headers.authorization.split(" ")[1]
      : null);

  if (token) {
    await blackListModel.create({ token });
  }

  return res.status(200).json({ message: "Logged Out Successfully" });
}

module.exports = {
  httpCreateNewUser,
  httpLoginUser,
  httpGetProfile,
  httpLogOutUser,
};
