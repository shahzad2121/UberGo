const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type:{
      firstname: {
        type: String,
        required: true,
        minlength: [3, "name should be of 3 character"],
      },
      lastname: {
        type: String,
      }},
    },
    email: {
      type: String,
      required: true,
      unique: true,
      minlength: [5, "Email must be contain on 5 characters"],
    },
    password: {
      type: String,
      required: true,
      select: false,
      minlength: [6, "Password must of 6 characters"],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
  return token;
};

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

userSchema.statics.hashPassword = async function (password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
