import mongoose from "mongoose";

const CaptainSchema = new mongoose.Schema(
  {
    captainName: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAvailable: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const captainModel = mongoose.model("Captain", CaptainSchema);

export default captainModel;
