const http = require("http");
require("dotenv").config;

const app = require("./app");

const PORT = process.env.PORT;

const server = http.createServer(app);

async function startServer() {
  server.listen(PORT, () => {
    console.log(`listening at port ${PORT}`);
  });
}

startServer();
