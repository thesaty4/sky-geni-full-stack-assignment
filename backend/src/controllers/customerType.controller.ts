// src/controllers/customerTypeController.ts
import { Request, Response } from "express";
import { CustomerTypeService } from "../services/customerType.service";

// Controller for Customer Type data
export class CustomerTypeController {
  // Get processed data for the dashboard (bar chart, doughnut chart, and table)
  static async getDashboardData(req: Request, res: Response) {
    try {
      const dashboardData = CustomerTypeService.getDashboardData();
      res.status(200).json(dashboardData);
    } catch (error) {
      res.status(500).json({ message: "Error fetching dashboard data", error });
    }
  }
}
