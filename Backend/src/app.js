const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const api = require("./routes/api");

const app = express();

app.use(express.json());

app.use("/v1", api);
app.get("/", (req, res) => {
  res.send("You are good to go");
});

module.exports = app;
