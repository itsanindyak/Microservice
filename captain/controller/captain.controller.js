import blacklisttokenModel from "../model/blacklist.model.js";
import captainModel from "../model/captain.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { captainName, email, password } = req.body;

    // check if captain already exists
    const existingcaptain = await captainModel.findOne({ email });
    if (existingcaptain) {
      return res.status(400).json({
        message: "captain already exists",
      });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create captain
    const captain = await captainModel.create({
      captainName,
      email,
      password: hashedPassword, // ✅ fixed
    });

    // generate token
    const token = jwt.sign({ id: captain._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // set cookie
    res.cookie("token", token, { httpOnly: true });

    return res.status(200).json({
      message: "captain registered successfully",
      captain: {
        _id: captain._id,
        captainname: captain.captainName,
        email: captain.email,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error registering captain",
      error: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const captain = await captainModel.findOne({ email }).select("+password");

    if (!captain) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, captain.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: captain._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    const captainData = captain.toObject();
    delete captainData.password;

    res.cookie("token", token);

    res.send({ token, captain: captainData });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    const token = req.cookies.token;

    await blacklisttokenModel.create({ token });

    res.clearCookie("token");

    res.send({ message: "captain logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const profile = async (req, res) => {
  try {
    res.send(req.captain);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const toogleAvailability = async (req, res) => {
  try {
    const captain = await captainModel.findById(req.captain._id).select("-password");
    captain.isAvailable = !captain.isAvailable;
    await captain.save();
    res.send(captain);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
