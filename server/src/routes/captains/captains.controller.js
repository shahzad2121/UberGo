const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");

const { createNewCaptain } = require("../../models/captain/captain.model");
const captainModel = require("../../models/captain/captain.mongo");
const blackListModel = require("../../models/blacklistToken.model");

async function httpRegisterCaptain(req, res) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const captain = req.body;

    if (
      !captain.email ||
      !captain.firstname ||
      !captain.password ||
      !captain.color ||
      !captain.capacity ||
      !captain.plate ||
      !captain.vehicleType
    ) {
      res.status(401).json({ message: "Something is missing" });
    }
    const { email } = captain;
    const findCaptain = await captainModel.findOne({ email });
    if (findCaptain) {
      return res.status(401).json({ message: "captain already exists" });
    }

    const newCaptain = await createNewCaptain(captain);
    return res
      .status(201)
      .json({ message: "captain Registered Successfully", newCaptain });
  } catch (error) {
    console.log("captain is not registered", error);
    return res.status(400).json({ error });
  }
}
async function httpLoginCaptain(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(401).json({ message: "All fields are required" });
  }
  const captain = await captainModel.findOne({ email }).select("+password");
  if (!captain) {
    return res.status(401).json({ message: "something went wrong" });
  }
  const isCaptainExists = await captain.comparePassword(password);
  if (!isCaptainExists) {
    return res.status(401).json({ message: "something went wrong" });
  }

  const token = await captain.generateAuthToken();
  res.cookie("token", token);
  return res.status(200).json({ token, captain });
}
async function httpGetProfile(req, res) {
  return res.status(200).json(req.captain);
}
async function httpLogoutCaptain(req, res) {
  res.clearCookie("token");
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  await blackListModel.create({ token });
  return res.status(200).json({ message: "Captain Logged Out Successfully" });
}

module.exports = {
  httpRegisterCaptain,
  httpLoginCaptain,
  httpGetProfile,
  httpLogoutCaptain,
};
