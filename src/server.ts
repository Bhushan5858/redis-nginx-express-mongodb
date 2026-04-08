import app from "./app";
import dotenv from "dotenv";
dotenv.config();

import connectDB from "./config/db";
import { redisClient } from "./config/redis";

const startServer = async () => {
  try {
    await connectDB();
    await redisClient.connect();
    console.log("Redis connected");

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Startup error:", error);
  }
};

startServer();
