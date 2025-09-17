import app from "./app.js";
import http from "http";


const server = http.createServer(app);

server.listen(4001, () => {
  console.log("captain server is started . http://localhost:4001");
});
