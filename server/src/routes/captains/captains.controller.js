const { validationResult } = require("express-validator");

const { captainModel } = require("../../models/captain/captain.mongo");
const blackListModel = require("../../models/blacklistToken.model");

async function httpRegisterCaptain(req, res) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name, email, password, vehicle } = req.body;

    if (!name || !email || !password || !vehicle || !vehicle.vehicleType) {
      res.status(401).json({ message: "Something is missing" });
    }
    const findCaptain = await captainModel.findOne({ email });
    if (findCaptain) {
      return res.status(401).json({ message: "captain already exists" });
    }
    const hashedPassword = await captainModel.hashPassword(password);

    const newCaptain = await captainModel.create({
      name: name,
      email: email,
      password: hashedPassword,
      vehicle: {
        color: vehicle.color,
        vehicleType: vehicle.vehicleType,
        capacity: vehicle.capacity,
        plate: vehicle.plate,
      },
    });
    const token = await newCaptain.generateAuthToken();
    return res.status(201).json({
success: true 
      message: "captain Registered Successfully",
      captain: newCaptain,
      token,
    });
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
  return res.status(200).json({ message: "Captain Logged Out Successfully", success : true});
}

module.exports = {
  httpRegisterCaptain,
  httpLoginCaptain,
  httpGetProfile,
  httpLogoutCaptain,
};
