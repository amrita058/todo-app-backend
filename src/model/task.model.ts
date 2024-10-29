import mongoose, { Schema } from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    taskName: { type: String },
    taskDescription: { type: String },
    taskStatus: { type: String, enum: ["pending", "in_progress", "completed"] },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("Task", taskSchema);
