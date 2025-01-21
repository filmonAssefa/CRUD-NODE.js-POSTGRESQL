import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import userRoute from "./routes/userRoute.js";
import errorHandler from "./middleware/errorHandler.js";
import createUserTable from "./data/createUserTable.js";

// Load environment variables
dotenv.config();

// Initialize express
const app = express();
const port = process.env.PORT || 3001;

// Security middleware
app.use(helmet());
app.use(cors());

// Logging middleware
app.use(morgan("dev"));

// Request parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize database tables
createUserTable().catch((err) => {
  console.error("Failed to create user table:", err);
  process.exit(1);
});

// API routes
app.use("/api/v1", userRoute);

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", timestamp: new Date() });
});

// Error handling
app.use(errorHandler);

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Handle unhandled rejections
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
  process.exit(1);
});
