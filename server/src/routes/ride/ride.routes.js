const express = require("express");
const { body } = require("express-validator");
const { authenticateUser } = require("../../../middlewares/auth.middleware");
const { httpCreateRide } = require("./ride.controller");

const ridesRouter = express.Router();

ridesRouter.post(
  "/create-ride",
  body("origin")
    .isString()
    .isLength({ min: 3 })
    .withMessage({ message: "invalid pickup point" }),
  body("destination")
    .isString()
    .isLength({ min: 3 })
    .withMessage({ message: "invalid destination" }),
  authenticateUser,
  httpCreateRide
);

module.exports = {
  ridesRouter,
};
