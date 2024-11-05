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

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    delete returnedObject.password;
  },
});

export default mongoose.model("User", userSchema);
