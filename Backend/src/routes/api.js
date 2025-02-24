const express = require("express");

const { usersRouter } = require("./users/users.routes");
const { captainRouter } = require("./captains/captains.routes");

const api = express.Router();

api.use("/users", usersRouter);
api.use("/captains", captainRouter);

module.exports = { api };
