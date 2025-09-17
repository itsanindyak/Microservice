import { Router } from "express";
import {
  login,
  logout,
  profile,
  register,
} from "../controller/user.controller.js";
import { userAuth } from "../middleware/auth.middleware.js";

export const userRoute = Router();

userRoute.get("/", (req, res) => {
  res.status(200).json({
    status:"ok",
    message: "user route",
  });
});

userRoute.post("/register", register);
userRoute.post("/login", login);
userRoute.get("/logout", logout);
userRoute.get("/profile", userAuth, profile);
