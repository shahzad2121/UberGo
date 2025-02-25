const express = require("express");
const { body } = require("express-validator");

const {
  httpCreateNewUser,
  httpLoginUser,
  httpGetProfile,
  httpLogOutUser,
} = require("./users.controller");
const {
  authenticateUser,
} = require("../../../middlewares/auth.middleware");

const usersRouter = express.Router();

usersRouter.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("firstname")
      .isLength({ min: 3 })
      .withMessage("Name should be contain 3 characters atleast"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password should be atleast 6 characters"),
  ],
  httpCreateNewUser
);
usersRouter.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be of 6 characters"),
  ],
  httpLoginUser
);
usersRouter.get("/profile", authenticateUser, httpGetProfile);
usersRouter.get("/logout", authenticateUser, httpLogOutUser);

module.exports = { usersRouter };
