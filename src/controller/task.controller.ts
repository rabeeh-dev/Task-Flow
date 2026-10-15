import type { Request, Response } from "express";
import { TaskModel } from "../models/task.model.js";

export async function getTasks(req: Request, res: Response): Promise<void> {
  try {
    const tasks = await TaskModel.find();
    res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks,
    });
  } catch (error: unknown) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch tasks",
    });
  }
}

export async function createTask(req: Request, res: Response): Promise<void> {
  try {
    const task = await TaskModel.create(req.body);

    res.status(201).json({
      success: true,
      data: task,
    });
  } catch (error: unknown) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to create task",
    });
  }
}

export async function updateTask(req: Request, res: Response): Promise<void> {
    try {
    const task = await TaskModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!task) {
      res.status(404).json({
        success: false,
        message: "Task not found"
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: task
    });
  } catch (error: unknown) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to update task"
    });
  }
}

export async function deleteTask(req: Request, res: Response): Promise<void> {
   try {
    const task = await TaskModel.findByIdAndDelete(req.params.id);

    if (!task) {
      res.status(404).json({
        success: false,
        message: "Task not found"
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Task deleted successfully"
    });
  } catch (error: unknown) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to delete task"
    });
  }
}