import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userName: { type: String, unique: true },
    password: { type: String },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("User", userSchema);
