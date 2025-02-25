const express = require("express");
const { body } = require("express-validator");

const {
  httpRegisterCaptain,
  httpLoginCaptain,
  httpGetProfile,
  httpLogoutCaptain,
} = require("./captains.controller");
const { authenticateCaptain } = require("../../../middlewares/auth.middleware");

const captainRouter = express.Router();

captainRouter.post(
  "/register",
  [
    body("firstname")
      .isLength({ min: 3 })
      .withMessage("length must be atleast 3 characters"),
    body("email").isEmail().withMessage("Email Required"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("length should be atleast 6 characters"),
    body("vehicle.color")
      .isLength({ min: 3 })
      .withMessage("Color must be at least 3 characters long"),
    body("vehicle.plate")
      .isLength({ min: 3 })
      .withMessage("Plate must be at least 3 characters long"),
    body("vehicle.capacity")
      .isInt({ min: 1 })
      .withMessage("Capacity must be at least 1"),
    body("vehicle.vehicleType")
      .isIn(["car", "motorcycle", "auto"])
      .withMessage("Invalid vehicle type"),
  ],
  httpRegisterCaptain
);
captainRouter.post(
  "/login",
  [
    body("email").isEmail().withMessage(`email can't be empty`),
    body("password")
      .isLength({ min: 6 })
      .withMessage(`password must be of 6 characters long minimum`),
  ],
  httpLoginCaptain
);
captainRouter.get("/profile", authenticateCaptain, httpGetProfile);
captainRouter.get("/logout", authenticateCaptain, httpLogoutCaptain);
module.exports = { captainRouter };
