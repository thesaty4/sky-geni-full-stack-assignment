// src/server.ts
import cors from "cors";
import express, { Request, Response } from "express";
import allRoutes from "./route";

// Initialize Express app
const app = express();
const port = 3000;

// Middleware
app.use(cors()); // Enable CORS for frontend
app.use(express.json()); // Parse JSON bodies

// Basic route for testing
app.get("/", (_req: Request, res: Response) => {
  res.send("Customer Dashboard Backend is running!");
});

// Mount routes
app.use("/api/v1", allRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
