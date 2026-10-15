import "dotenv/config";
import express from "express";
import { connectDatabase } from "./config/db.js";

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

app.get("/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "TaskFlow API is running"
  });
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