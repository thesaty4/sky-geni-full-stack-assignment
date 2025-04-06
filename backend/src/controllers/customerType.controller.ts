// src/controllers/customerTypeController.ts
import { Request, Response } from "express";
import { MODULE_NAMES } from "../models/customerType.model";
import { CustomerTypeService } from "../services/customerType.service";

// Controller for Customer Type data
export class CustomerTypeController {
  // Get processed data for the dashboard (bar chart, doughnut chart, and table)

  static async getDashboardData(req: Request, res: Response) {
    const { query } = req;
    try {
      const dashboardData = CustomerTypeService.getDashboardData(
        query.module as MODULE_NAMES
      );
      res.status(200).json(dashboardData);
    } catch (error) {
      res.status(500).json({ message: "Error fetching dashboard data", error });
    }
  }
}
