import { NextFunction, Request, Response } from "express";
import * as UserService from "../service/user.service";

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("at login user", req.body);
    // const { userName, password } = req.body;
    // console.log("username and password", userName, password);
    res.status(201).json(await UserService.loginUser(req.body));
  } catch (e: any) {
    next(e);
  }
};

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.status(201).json(await UserService.registerUser(req.body));
  } catch (e) {
    next(e);
  }
};
