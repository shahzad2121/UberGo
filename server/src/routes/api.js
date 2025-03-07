const express = require("express");

const { usersRouter } = require("./users/users.routes");
const { captainsRouter } = require("./captains/captains.routes");
const { mapsRouter } = require("./maps/maps.routes");
const { ridesRouter } = require("./ride/ride.routes");

const api = express.Router();

api.use("/users", usersRouter);
api.use("/captains", captainsRouter);
api.use("/maps", mapsRouter);
api.use("/rides", ridesRouter);

module.exports = { api };
