import "dotenv/config";
import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import axios from "axios";
import nodemailer from "nodemailer";
import User from "./models/user.js";
import Trip from "./models/trip.js";

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

app.get("/", (res, req) => {
  res.send("Trip Planner Api");
});

app.post("/api/trips", async (req, res) => {
  try {
    const {
      tripName,
      startDate,
      endDate,
      startDay,
      endDay,
      background,
      budget = 0,
      expenses = [],
      placesToVisit = [],
      itinerary = [],
      travelers = [],
      clerkUserId,
      userData = {},
    } = req.body;

    if (!clerkUserId) {
      return res.status(401).json({ error: "User id is req" });
    }
    if (
      !tripName ||
      !startDate ||
      !endDate ||
      !startDay ||
      !endDay ||
      !background
    ) {
      return res.status(400).json({ error: "Missing required trip fields" });
    }
    let user = await User.find({ clerkUserId });
    if (!user) {
      const { email, name } = userData;
      if (!email) {
        return res.status(400).json({ error: "User email is required" });
      }
      user = new User({ clerkUserId, user, name });
      await user.save();
    }

    const trip = new Trip({
      tripName,
      startDate,
      endDate,
      startDay,
      endDay,
      background,
      host: user._id,
      travelers: [user._id, ...travelers],
      budget,
      expenses,
      placeToVisit,
      itinerary,
    });
    await trip.save();
    res.status(201).json({ message: "Trip created successfully!" });
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({ error: "failed to create trip" });
  }
});

app.get("/api/trips", async (req, res) => {
  try {
    const { clerkUserId, email } = req.body;

    let user = User.findOne({ clerkUserId });
    if (!user) {
      if (!email) {
        return res.status(400).json({ error: "User email is required" });
      }
      user = new User({ clerkUserId, email: email.toString(), name: "" });
      await user.save();
    }
    const trips = await Trip.find({
      $or: [{ host: user._id }, { travelers: user._id }],
    }).populate("host travelers");
    res.status(200).json({ trips });
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({ error: "Failed to fetch trips" });
  }
});
