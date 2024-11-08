import mongoose from "mongoose";
import Task from "../entities/task.entity";
import { ICreateTaskParams } from "../validations/task.validations";

export const createTask = async (task: ICreateTaskParams, userId: string) => {
  try {
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

export const getTaskById = async (taskId: string, userId: string) => {
  try {
    const task = await Task.findOne({
      _id: taskId,
      userId: new mongoose.Types.ObjectId(userId),
    });
    return { sucess: true, data: task };
  } catch (e) {
    console.log("service", e);
    throw e;
  }
};

export const deleteTaskById = async (taskId: string, userId: string) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: taskId,
      userId: new mongoose.Types.ObjectId(userId),
    });
    return { sucess: true, data: task };
  } catch (e) {
    throw e;
  }
};

export const updateTaskById = async (
  taskId: string,
  task: Partial<ICreateTaskParams>,
  userId: string
) => {
  try {
    const updatedTask = await Task.findOneAndUpdate(
      { _id: taskId, ...task, userId: new mongoose.Types.ObjectId(userId) },
      task
    );
    return { sucess: true, data: updatedTask };
  } catch (e) {
    throw e;
  }
};
