import app from "./app.js";
import http from "http";


const server = http.createServer(app);

server.listen(3001, () => {
  console.log("user server is started . http://localhost:3001");
});
