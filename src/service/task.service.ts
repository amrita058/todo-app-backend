import { ErrorHandler } from "../config/error.config";
import {
  createTaskValidation,
  ICreateTaskParams,
} from "../validations/task.validations";
import Task from "../entities/task.entity";
import mongoose from "mongoose";

export const createTask = async (task: ICreateTaskParams, userId: string) => {
  try {
    const validateData = createTaskValidation.safeParse(task);
    if (!validateData.success) {
      const error = new ErrorHandler(
        validateData.error?.format()?.taskName?._errors[0] ||
          validateData.error?.format()?.taskDescription?._errors[0] ||
          validateData.error?.format()?.taskStatus?._errors[0] ||
          "Invalid data",
        400
      );
      throw error;
    } else {
      const newTask = new Task({
        ...task,
        userId: new mongoose.Types.ObjectId(userId),
      });
      const insertedTask = await newTask.save();
      return {
        success: true,
        message: "Task created successfully",
        data: insertedTask,
      };
    }
  } catch (e) {
    console.log("service", e);
    throw e;
  }
};

export const getAllTasks = async (userId: string) => {
  try {
    const tasks = await Task.find({
      userId: new mongoose.Types.ObjectId(userId),
    });
    return { sucess: true, data: tasks };
  } catch (e) {
    throw e;
  }
};

export const getTaskById = async (taskId: string) => {
  try {
    const task = await Task.findById(taskId);
    return { sucess: true, data: task };
  } catch (e) {
    throw e;
  }
};

export const deleteTaskById = async (taskId: string) => {
  try {
    const task = await Task.findByIdAndDelete(taskId);
    return { sucess: true, data: task };
  } catch (e) {
    throw e;
  }
};

export const updateTaskById = async (
  taskId: string,
  task: Partial<ICreateTaskParams>
) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(taskId, task);
    return { sucess: true, data: updatedTask };
  } catch (e) {
    throw e;
  }
};
