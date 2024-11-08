import bcrypt from "bcrypt";
import jwt, { Secret } from "jsonwebtoken";
import { env } from "../config/env.config";
import { ErrorHandler } from "../config/error.config";
import User from "../entities/user.entity";
import {
  IUserLoginParams,
  IUserRegisterParams,
} from "../validations/user.validations";

export const loginUser = async (user: IUserLoginParams) => {
  try {
    const data = await User.findOne({ userName: user.userName });
    if (data) {
      const isMatch = await bcrypt.compare(
        user.password,
        data.password as string
      );
      if (isMatch) {
        const token = jwt.sign(data._id.toString(), env.SECRET_KEY as Secret);
        console.log("token:", token);
        return { token };
      } else {
        const error = new ErrorHandler("Incorrect password", 401);
        throw error;
      }
    } else {
      const error = new ErrorHandler("User not found", 404);
      throw error;
    }
  } catch (e) {
    console.log("service", e);
    throw e;
  }
};

export const registerUser = async (user: IUserRegisterParams) => {
  try {
    console.log("success validation");
    const checkUserName = await User.findOne({ userName: user.userName });
    if (checkUserName) {
      const error = new ErrorHandler("Username taken", 409);
      error.name = "userName";
      throw error;
    }
    user.password = await bcrypt.hash(user.password, 10);
    const newUser = new User(user);
    const insertedUser = await newUser.save();
    return {
      success: true,
      message: "User registered successfully",
      data: insertedUser,
    };
  } catch (e) {
    throw e;
  }
};
