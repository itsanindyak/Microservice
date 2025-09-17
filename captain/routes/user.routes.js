import { Router } from "express";
import {
  login,
  logout,
  profile,
  register,
  toogleAvailability,
} from "../controller/captain.controller.js";
import { captainAuth } from "../middleware/auth.middleware.js";

export const captainRoute = Router();

captainRoute.get("/", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "Captain Route",
  });
});
captainRoute.post("/register", register);
captainRoute.post("/login", login);
captainRoute.get("/logout", logout);
captainRoute.get("/profile", captainAuth, profile);
captainRoute.patch("/availability", captainAuth, toogleAvailability);
