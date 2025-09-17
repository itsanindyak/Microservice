import express from "express";
import { configDotenv } from "dotenv";
import cookieParser from "cookie-parser";
import connect from "./DB/db.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
configDotenv();

connect();


import { captainRoute } from "./routes/user.routes.js";
app.use("/", captainRoute);

export default app;
