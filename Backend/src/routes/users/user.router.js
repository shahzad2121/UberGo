const express = require("express");
const { body } = require("express-validator");

const userRouter = express.Router();

userRouter.post("/register", [
  body("email").isEmail().withMessage("Invalid Email"),
  body('fullname.firstname').isLength({min:3}).withMessage('Name should be contain 3 characters atleast'),
  body('password').isLength({min : 6}).withMessage('Password should be atleast 6 characters')
]);
