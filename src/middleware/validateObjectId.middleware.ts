import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { ErrorHandler } from "../config/error.config";

export const validateObjectId = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    const error = new ErrorHandler("Invalid id format", 400);
    console.log("error in mongoose _id validate middleware", error);
    next(error);
  } else {
    next();
  }
};
