const express = require("express");
const { authenticateUser } = require("../../../middlewares/auth.middleware");
const {
  httpGetAddressCoordinates,
  httpGetDistance,
  httpGetSuggestions,
} = require("./maps.controller");
const { query } = require("express-validator");

const mapsRouter = express.Router();

mapsRouter.get(
  "/get-coordinates",
  query("address").isString().isLength({ min: 3 }),
  authenticateUser,
  httpGetAddressCoordinates
);
mapsRouter.get(
  "/get-distance",
  query("origin")
    .isString()
    .withMessage("origin is requierd")
    .isLength({ min: 3 }),
  query("destination")
    .isString()
    .withMessage("destination is requierd")
    .isLength({ min: 3 }),

  authenticateUser,
  httpGetDistance
);

mapsRouter.get(
  "/get-suggestions",
  query("input").isString().isLength({ min: 3 }),
  authenticateUser,
  httpGetSuggestions
);

module.exports = {
  mapsRouter,
};
