const { validationResult } = require("express-validator");

const { createNewUser } = require("../../models/user/user.model");
const userModel = require("../../models/user/user.mongo");

async function httpCreateNewUser(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const user = req.body;
  if (!user.email || !user.firstname || !user.password) {
    throw new Error("something is missing");
  }
  try {
    const { email } = user;
    const userAlreadyExists = await userModel.findOne({ email });
    if (userAlreadyExists) {
      return res.status(400).json("User already exists");
    }
    const newUser = await createNewUser(user);
    return res
      .status(201)
      .json({ message: "user created successfully", newUser });
  } catch (error) {
    console.error("error creating new user", error);
    return res.status(500).json({ error: "internal server error" });
  }
}

async function httpLoginUser(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  const user = await userModel.findOne({ email }).select("+password");
  if (!user) {
    res.status(400).json("Invalid Email or Password");
  }
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return res.status(400).json("Invalid email or password");
  }


  const token = await user.generateAuthToken();

  res.cookie("token", token);
  res.status(200).json({ token, user });
}

module.exports = { httpCreateNewUser, httpLoginUser };
