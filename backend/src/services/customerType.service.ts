import {
  CustomerType,
  DashboardData,
  customerTypeData,
} from "../models/customerType.model";

export class CustomerTypeService {
  // Get raw customer type data
  static getAll(): CustomerType[] {
    return customerTypeData;
  }

  // Process data for the dashboard (bar chart, doughnut chart, and table)
  static getDashboardData(): DashboardData {
    // Get unique quarters and sort them
    const quarters = [
      ...new Set(customerTypeData.map((d) => d.closed_fiscal_quarter)),
    ].sort();

    // Process data for bar chart
    const barChart = quarters.map((quarter) => {
      const existing = customerTypeData.find(
        (d) =>
          d.closed_fiscal_quarter === quarter &&
          d.Cust_Type === "Existing Customer"
      ) || { acv: 0 };
      const newCust = customerTypeData.find(
        (d) =>
          d.closed_fiscal_quarter === quarter && d.Cust_Type === "New Customer"
      ) || { acv: 0 };
      return {
        quarter,
        existing: existing.acv,
        new: newCust.acv,
        total: existing.acv + newCust.acv,
      };
    });

    // Process data for doughnut chart
    const totalExisting = customerTypeData
      .filter((d) => d.Cust_Type === "Existing Customer")
      .reduce((sum, d) => sum + d.acv, 0);
    const totalNew = customerTypeData
      .filter((d) => d.Cust_Type === "New Customer")
      .reduce((sum, d) => sum + d.acv, 0);
    const total = totalExisting + totalNew;

    // Process data for table
    const table = quarters.map((quarter) => {
      const existing = customerTypeData.find(
        (d) =>
          d.closed_fiscal_quarter === quarter &&
          d.Cust_Type === "Existing Customer"
      ) || { count: 0, acv: 0 };
      const newCust = customerTypeData.find(
        (d) =>
          d.closed_fiscal_quarter === quarter && d.Cust_Type === "New Customer"
      ) || { count: 0, acv: 0 };
      const quarterTotal = existing.acv + newCust.acv;
      return {
        quarter,
        existingCount: existing.count,
        existingAcv: existing.acv,
        newCount: newCust.count,
        newAcv: newCust.acv,
        existingPercent:
          quarterTotal > 0
            ? Math.round((existing.acv / quarterTotal) * 100)
            : 0,
        newPercent:
          quarterTotal > 0 ? Math.round((newCust.acv / quarterTotal) * 100) : 0,
      };
    });

    // Calculate totals for the table
    const totals = {
      existingCount: customerTypeData
        .filter((d) => d.Cust_Type === "Existing Customer")
        .reduce((sum, d) => sum + d.count, 0),
      existingAcv: totalExisting,
      newCount: customerTypeData
        .filter((d) => d.Cust_Type === "New Customer")
        .reduce((sum, d) => sum + d.count, 0),
      newAcv: totalNew,
      existingPercent:
        total > 0 ? Math.round((totalExisting / total) * 100) : 0,
      newPercent: total > 0 ? Math.round((totalNew / total) * 100) : 0,
    };

    return {
      barChart,
      doughnutChart: { totalExisting, totalNew, total },
      table,
      totals,
    };
  }
}
