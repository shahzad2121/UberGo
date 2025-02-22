const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fulllname: {
      firstname: {
        type: String,
        required: true,
        minlength: [3, "name should be of 3 character"],
      },
      lastname: {
        type: String,
      },
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

module.exports = mongoose.model("user", userSchema);
