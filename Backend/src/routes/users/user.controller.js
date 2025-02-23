const { validationResult } = require("express-validator");

const { CreateNewUser } = require("../../models/users/user.model");
const { validate } = require("../../models/users/user.mongo");
const userModel = require("../../models/users/user.mongo");

async function httpCreateNewUser(req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json("All fields are required");
    }

    const user = req.body;
    if (!user.email || !user.fullname || !user.password) {
      throw new Error("something is missing");
    }

    const hashedPassword = userModel.hashPassword();

    await CreateNewUser(user);

    const token = userModel.generateAuthToken();

    res.status(200).json({ message: "user created", token, user });
  } catch (error) {}
}
