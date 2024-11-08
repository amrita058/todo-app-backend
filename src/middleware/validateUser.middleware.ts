import e, { NextFunction, Request, Response } from "express";
import { ErrorHandler } from "../config/error.config";
import {
  UserLoginSchema,
  UserRegisterSchema,
} from "../validations/user.validations";

export const validateLoginSchema = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const validateData = UserLoginSchema.safeParse(req.body);
  // console.log("validate data", user, validateData.error?.format());
  if (!validateData.success) {
    const error = new ErrorHandler(
      validateData.error?.format()?.userName?._errors[0] ||
        validateData.error?.format()?.password?._errors[0] ||
        "Invalid data",
      400
    );
    console.log("error in user validate middleware", error);
    next(error);
  } else {
    next();
  }
};

export const validateRegisterSchema = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const validateData = UserRegisterSchema.safeParse(req.body);
  // console.log("validate data", user, validateData.error?.format());
  if (!validateData.success) {
    const error = new ErrorHandler(
      validateData.error?.format()?.userName?._errors[0] ||
        validateData.error?.format()?.password?._errors[0] ||
        "Invalid data",
      400
    );
    console.log("error in user validate middleware", error);
    next(error);
  } else {
    next();
  }
};
