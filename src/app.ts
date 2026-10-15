import "dotenv/config";
import express from "express";
import { connectDatabase } from "./config/db.js";
import { TaskModel } from "./models/task.model.js";

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

app.get("/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "TaskFlow API is running"
  });
});


app.get("/tasks", async (_req, res) => {
  try {
    const tasks = await TaskModel.find();

    res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks
    });
  } catch (error: unknown) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch tasks"
    });
  }
});

app.post("/tasks", async (req, res) => {
  try {
    const task = await TaskModel.create(req.body);

    res.status(201).json({
      success: true,
      data: task
    });
  } catch (error: unknown) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to create task"
    });
  }
});


app.put("/tasks/:id", async (req, res) => {
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
});

app.delete("/tasks/:id", async (req, res) => {
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
});



async function startServer(): Promise<void> {
  await connectDatabase();

  app.listen(PORT, () => {
    console.log(`TaskFlow API running on port ${PORT}`);
  });
}

startServer().catch((error: unknown) => {
  console.error("Failed to start TaskFlow API:", error);
  process.exitCode = 1;
});