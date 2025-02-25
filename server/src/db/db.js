const mongoose = require("mongoose");

// require("dotenv").config();

const MONGO_URL = 'mongodb://127.0.0.1:27017/ubergo'

mongoose.connection.on("open", () => {
    console.log("DB is connected");
  });
  
  mongoose.connection.on("error", (err) => {
    console.error(err);
  });

async function connectToDB() {
  await mongoose.connect(MONGO_URL)
}

module.exports =  connectToDB ;
