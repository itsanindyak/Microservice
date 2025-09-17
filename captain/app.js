import express from "express";
import { config } from "dotenv";
config();
import cookieParser from "cookie-parser";
import connect from "./DB/db.js";
import { initRabbit } from "./service/messageQueue.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

connect();

await initRabbit()

import { captainRoute } from "./routes/user.routes.js";
app.use("/", captainRoute);

export default app;
