import { env } from "../config/env.config";
import mongoose from "mongoose";

export const connectDB = async () => {
  if (process.env.MONGO_URI != undefined) {
    try {
      await mongoose.connect(env.MONGO_URI as string);
      console.log("connected");
    } catch (err: any) {
      console.log("not connected", err);
    }
    mongoose.connection.on("open", () => {
      console.log("connection open");
    });
    mongoose.connection.on("error", (err) => {
      console.error("Connection error:", err);
    });
  } else {
    console.log("MONGO_URI not defined");
  }
};
