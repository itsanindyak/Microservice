import express from "express";
import { configDotenv } from "dotenv";
import cookieParser from "cookie-parser";
import connect from "./DB/db.js";
import { initRabbit } from "./service/messageQueue.js";

const app = express();
configDotenv();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

connect();

await initRabbit();

import { userRoute } from "./routes/user.routes.js";
app.use("/", userRoute);

export default app;
