import jwt from "jsonwebtoken";
import userModel from "../model/user.model.js";
import blacklisttokenModel from "../model/blacklist.model.js";

export const userAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers.authorization.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const isBlacklisted = await blacklisttokenModel.find({ token });

    if (isBlacklisted.length) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
  

    req.user = user;

    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
