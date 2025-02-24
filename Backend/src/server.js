const http = require("http");
require("dotenv").config;

const app = require("./app");
const  connectToDB  = require("./db/db");

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

async function startServer() {
  await connectToDB();
  server.listen(PORT, () => {
    console.log(`listening at port ${PORT}`);
  });
}

startServer();
