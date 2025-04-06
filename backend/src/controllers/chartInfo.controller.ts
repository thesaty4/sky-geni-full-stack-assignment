// src/controllers/customerTypeController.ts
import { Request, Response } from "express";
import { MODULE_NAMES } from "../models/customerType.model";
import { ChartInfoService } from "../services/chartInfo.service";

// Controller for Chart Info
export class ChartInfoController {
  // Get processed data for the dashboard (bar chart, doughnut chart, and table)

  static async getDashboardData(req: Request, res: Response) {
    const { query } = req;
    try {
      const dashboardData = ChartInfoService.getDashboardData(
        query.module as MODULE_NAMES
      );
      res.status(200).json(dashboardData);
    } catch (error) {
      res.status(500).json({ message: "Error fetching dashboard data", error });
    }
  }
}
