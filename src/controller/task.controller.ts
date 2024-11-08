import { NextFunction, Request, Response } from "express";
import * as TaskService from "../service/task.service";

export const createTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("create task", res.locals.userId, req.body);
  try {
    res
      .status(201)
      .json(await TaskService.createTask(req.body, res.locals.userId));
  } catch (e: any) {
    next(e);
  }
};

export const getAllTasks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.status(201).json(await TaskService.getAllTasks(res.locals.userId));
  } catch (e: any) {
    next(e);
  }
};

export const getTaskById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res
      .status(201)
      .json(await TaskService.getTaskById(req.params.id, res.locals.userId));
  } catch (e: any) {
    next(e);
  }
};

export const deleteTaskById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res
      .status(201)
      .json(await TaskService.deleteTaskById(req.params.id, res.locals.userId));
  } catch (e: any) {
    next(e);
  }
};

export const updataTaskById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res
      .status(201)
      .json(
        await TaskService.updateTaskById(
          req.params.id,
          req.body,
          res.locals.userId
        )
      );
  } catch (e: any) {
    next(e);
  }
};
