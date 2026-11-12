import "dotenv/config";
import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import axios from "axios";
import nodemailer from "nodemailer";

const app = express();
const port = process.env.PORT || 8082;

app.use(cors());
app.use(express.json());

const startServer = async () => {
  const mongoUrl = process.env.MONGODB_URI;
  if (!mongoUrl) {
    throw new Error("MONGODB_URI must be set in the environment or api/.env");
  }

  await mongoose.connect(mongoUrl);
  console.log("Connected to MongoDB");

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
};

startServer().catch((error) => {
  console.error("Failed to start API server:", error);
  process.exitCode = 1;
});
