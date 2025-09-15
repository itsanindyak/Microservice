import { Router } from "express";
import { login, logout, profile, register } from "../controller/user.controller.js";
import { userAuth } from "../middleware/auth.middleware.js";

export const userRoute = Router();


userRoute.post("/register",register)
userRoute.post("/login", login);
userRoute.get("/logout", logout);
userRoute.get("/profile", userAuth, profile);