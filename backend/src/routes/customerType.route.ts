// src/routes/customerTypeRoutes.ts
import { Router } from "express";
import { CustomerTypeController } from "../controllers/customerType.controller";

const router = Router();

// Define routes for customer type data
router.get("/", CustomerTypeController.getAllCustomerTypes); // GET /api/customer-type
router.get("/dashboard", CustomerTypeController.getDashboardData); // GET /api/customer-type/dashboard
router.get("/table-info", CustomerTypeController.getTableData); // GET /api/customer-type/dashboard

export default router;
