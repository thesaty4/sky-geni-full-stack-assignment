// src/routes/customerTypeRoutes.ts
import { Router } from "express";
import { CustomerTypeController } from "../controllers/customerType.controller";

const router = Router();

// Define routes for customer type data
router.get("/dashboard", CustomerTypeController.getDashboardData);
export default router;
