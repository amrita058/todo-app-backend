import { Request, Response, NextFunction } from "express";
import { ErrorHandler } from "../config/error.config";
import { MongooseError } from "mongoose";

export const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ErrorHandler) {
    res
      .status(err.statusCode ? err.statusCode : 500)
      .json({ status: false, message: err.msg || err.message });
  } else if (err instanceof MongooseError) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  } else {
    res.status(500).json({
      status: false,
      message: "Something went wrong. Internal server error.",
    });
  }
};
