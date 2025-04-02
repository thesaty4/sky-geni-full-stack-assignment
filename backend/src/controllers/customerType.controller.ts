// src/controllers/customerTypeController.ts
import { Request, Response } from "express";
import { CustomerTypeModel } from "../models/customerType.model";

// Controller for Customer Type data
export class CustomerTypeController {
  // Get all customer type data (raw data)
  static async getAllCustomerTypes(req: Request, res: Response) {
    try {
      const data = CustomerTypeModel.getAll();
      res.status(200).json(data);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error fetching customer type data", error });
    }
  }

  // Get processed data for the dashboard (bar chart, doughnut chart, and table)
  static async getDashboardData(req: Request, res: Response) {
    try {
      const dashboardData = CustomerTypeModel.getDashboardData();
      res.status(200).json(dashboardData);
    } catch (error) {
      res.status(500).json({ message: "Error fetching dashboard data", error });
    }
  }
}
