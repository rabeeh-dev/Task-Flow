import mongoose, { Schema } from "mongoose";

export type TaskStatus = "todo" | "in-progress" | "completed";
export type TaskPriority = "low" | "medium" | "high";

export interface Task {
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
}

const taskSchema = new Schema<Task>(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    status: {
      type: String,
      enum: ["todo", "in-progress", "completed"],
      default: "todo"
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium"
    }
  },
  {
    timestamps: true
  }
);

export const TaskModel = mongoose.model<Task>("Task", taskSchema);