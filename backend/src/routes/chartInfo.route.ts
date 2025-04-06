// src/routes/customerTypeRoutes.ts
import { Router } from "express";
import { ChartInfoController } from "../controllers/chartInfo.controller";

const router = Router();

// Define routes for customer type data
router.get("/dashboard", ChartInfoController.getDashboardData);
export default router;
