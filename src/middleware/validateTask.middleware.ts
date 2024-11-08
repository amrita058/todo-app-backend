import { NextFunction, Request, Response } from "express";
import { ErrorHandler } from "../config/error.config";
import { createTaskValidation } from "../validations/task.validations";

export const validateCreateTaskSchema = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const validateData = createTaskValidation.safeParse(req.body);
  if (!validateData.success) {
    const error = new ErrorHandler(
      validateData.error?.format()?.taskName?._errors[0] ||
        validateData.error?.format()?.taskDescription?._errors[0] ||
        validateData.error?.format()?.taskStatus?._errors[0] ||
        validateData.error?.format()?.expiresAt?._errors[0] ||
        "Invalid data",
      400
    );
    console.log("error in user validate middleware", error);
    next(error);
  } else {
    next();
  }
};
