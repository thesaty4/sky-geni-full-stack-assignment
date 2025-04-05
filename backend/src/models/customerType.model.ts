import fs from "fs";
import path from "path";

// Read the JSON file
export const customerTypeDataPath = path.resolve(
  __dirname,
  "../data/customer_type.json"
);
export let customerTypeData: CustomerType[] = [];

try {
  const rawData = fs.readFileSync(customerTypeDataPath, "utf-8");
  customerTypeData = JSON.parse(rawData) as CustomerType[];
} catch (error) {
  console.error("Error reading customerTypeData.json:", error);
  throw new Error("Failed to load customer type data");
}

// Interface for Customer Type data
export interface CustomerType {
  count: number;
  acv: number;
  closed_fiscal_quarter: string;
  Cust_Type: string;
}

// Interface for processed data for the dashboard
export interface DashboardData {
  barChart: Array<{
    quarter: string;
    existing: number;
    new: number;
    total: number;
  }>;
  doughnutChart: {
    totalExisting: number;
    totalNew: number;
    total: number;
  };
}

/**
 * Represents grouped customer table data response.
 */
export type CustomerTableDataResponseType = Record<
  string, // Quarter
  Record<
    string, // Customer Type
    {
      totalPercentage: number;
      data: { count: number; acv: number };
    }
  >
>;

/**
 * Represents API response format for table data.
 */
export type TableAPIInfo = {
  quarter: string;
  subDataInfo: {
    totalInfo: CustomerDataType;
    dataList: CustomerDataType[];
  };
};

/**
 * Represents a customer's data type.
 */
export type CustomerDataType = {
  type: string;
  totalPercentage: number;
  data: {
    count: number;
    acv: number;
  };
};

/**
 * Represents the final response structure.
 */
export type FinalResponse = {
  total: TableAPIInfo & Partial<Pick<TableAPIInfo, "quarter">>;
  data: TableAPIInfo[];
  rowTypes: string[];
};
