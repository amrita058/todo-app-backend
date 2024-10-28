import { ErrorHandler } from "../utils/error";
import { env } from "../config/env.config";
import User from "../model/user.model";
import bcrypt from "bcrypt";
import jwt, { Secret } from "jsonwebtoken";
import {
  IUserLoginParams,
  IUserRegisterParams,
  UserLoginSchema,
  UserRegisterSchema,
} from "../validations/user.validations";

export const loginUser = async (user: IUserLoginParams) => {
  try {
    const validateData = UserLoginSchema.safeParse(user);
    // console.log("validate data", user, validateData.error?.format());
    if (!validateData.success) {
      const error = new ErrorHandler("Invalid data", 401);
      throw error;
    }
    const data = await User.findOne({ userName: user.userName });
    if (data) {
      const isMatch = await bcrypt.compare(
        user.password,
        data.password as string
      );
      if (isMatch) {
        const token = jwt.sign(
          data.userName as string,
          env.SECRET_KEY as Secret
        );
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
    const validateData = UserRegisterSchema.safeParse(user);
    // console.log("validate data", user, validateData.error?.format());
    if (!validateData.success) {
      const error = new ErrorHandler(
        validateData.error?.format()?.userName?._errors[0] ||
          validateData.error?.format()?.password?._errors[0] ||
          "Invalid data",
        400
      );
      throw error;
    } else {
      console.log("success validation");
      const checkUserName = await User.findOne({ userName: user.userName });
      if (checkUserName) {
        const error = new ErrorHandler("Username taken", 409);
        error.name = "userName";
        throw error;
      }
      user.password = await bcrypt.hash(user.password, 10);
      const newUser = new User(user);
      const insertedUser = await newUser
        .save()
        .then((savedUser) => {
          console.log("New user saved:", savedUser);
        })
        .catch((error: Error) => {
          error.message = "Server error";
          throw error;
        });
      return { success: true, message: "User registered successfully" };
    }
  } catch (e) {
    throw e;
  }
};
