const express = require("express");

const api = express.Router();

const usersRouter = require("./users/user.router");

api.use("/users", usersRouter);

module.exports = { api };
