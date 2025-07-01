import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import config from "./config";
import { userRouter } from "./routes/userRouter";
import cors from "cors"
dotenv.config();

const app = express();
const PORT_NUMBER = config.PORT_NUMBER;

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", // Allow this specific origin
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization", "token"], // Allowed headers
  })
);
app.use("/api/v1/user", userRouter); 

mongoose.connection.on("connected", () => {
  console.log("✅ Mongoose connected successfully");
});

mongoose.connection.on("error", (err) => {
  console.error("❌ Mongoose connection error:", err);
});

async function main() {
  try {
    await mongoose.connect(config.MONGO_AUTH_URL!);
    console.log("🚀 Connected to MongoDB");
    app.listen(PORT_NUMBER, () => {
      console.log(`Server running on port ${PORT_NUMBER}`);
    });
  } catch (err) {
    console.error("❌ Failed to connect to MongoDB", err);
    process.exit(1);
  }
}

main();
