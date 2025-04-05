import {
  CustomerDataType,
  CustomerTableDataResponseType,
  CustomerType,
  DashboardData,
  FinalResponse,
  TableAPIInfo,
  customerTypeData,
} from "../models/customerType.model";

/**
 * Service to handle customer type data processing.
 */
export class CustomerTypeService {
  /**
   * Retrieves all customer type data.
   * @returns {CustomerType[]} List of customer types.
   */
  static getAll(): CustomerType[] {
    return customerTypeData;
  }

  /**
   * Processes and returns data for the dashboard including bar chart, doughnut chart, and table data.
   * @returns {DashboardData} Processed dashboard data.
   */
  static getDashboardData(): DashboardData {
    // Extract unique quarters and sort them chronologically
    const quarters = [
      ...new Set(customerTypeData.map((d) => d.closed_fiscal_quarter)),
    ].sort();

    // Prepare bar chart data
    const barChartData = quarters.map((quarter) => {
      const existingCustomer = customerTypeData.find(
        (d) =>
          d.closed_fiscal_quarter === quarter &&
          d.Cust_Type === "Existing Customer"
      ) || { acv: 0 };

      const newCustomer = customerTypeData.find(
        (d) =>
          d.closed_fiscal_quarter === quarter && d.Cust_Type === "New Customer"
      ) || { acv: 0 };

      return {
        quarter,
        existing: existingCustomer.acv,
        new: newCustomer.acv,
        total: existingCustomer.acv + newCustomer.acv,
      };
    });

    // Compute doughnut chart data
    const totalExistingACV = customerTypeData
      .filter((d) => d.Cust_Type === "Existing Customer")
      .reduce((sum, d) => sum + d.acv, 0);

    const totalNewACV = customerTypeData
      .filter((d) => d.Cust_Type === "New Customer")
      .reduce((sum, d) => sum + d.acv, 0);

    return {
      barChart: barChartData,
      doughnutChart: {
        totalExisting: totalExistingACV,
        totalNew: totalNewACV,
        total: totalExistingACV + totalNewACV,
      },
    };
  }

  /**
   * Generates and returns sorted table data for customer types, categorized by fiscal quarter.
   * The data includes total counts and ACV (Annual Contract Value) for each customer type
   * along with computed percentage distributions.
   *
   * @returns {FinalResponse} Formatted and sorted customer type table data.
   */
  static getTableData(): FinalResponse {
    // row type extracted
    const rowTypes = new Set(customerTypeData.map((d) => d.Cust_Type));

    // Sort customer data by fiscal quarter in ascending order
    const sortedCustomerData = [...customerTypeData].sort((a, b) =>
      a.closed_fiscal_quarter.localeCompare(b.closed_fiscal_quarter)
    );

    // Group records by quarter and customer type
    const groupedRecords = sortedCustomerData.reduce((acc, curr) => {
      const { closed_fiscal_quarter: quarter, Cust_Type } = curr;

      // Initialize quarter and customer type if not present
      if (!acc[quarter]) acc[quarter] = {};
      if (!acc[quarter][Cust_Type]) {
        acc[quarter][Cust_Type] = {
          totalPercentage: 0,
          data: { count: 0, acv: 0 },
        };
      }

      // Accumulate customer count and ACV
      acc[quarter][Cust_Type].data.count += curr.count;
      acc[quarter][Cust_Type].data.acv += curr.acv;

      return acc;
    }, {} as CustomerTableDataResponseType);

    let grandTotalACV = 0;
    let grandTotalCount = 0;
    const totalCustomerTypeData: Record<string, CustomerDataType> = {};

    // Transform grouped records into a structured response
    const formattedTableData: TableAPIInfo[] = Object.entries(
      groupedRecords
    ).map(([quarter, data]) => {
      let totalACV = 0;
      let totalCount = 0;

      // Process each customer type within the quarter
      const customerEntries = Object.entries(data).map(([cType, cData]) => {
        totalACV += cData.data.acv;
        totalCount += cData.data.count;

        // Track cumulative total across all quarters
        if (!totalCustomerTypeData[cType]) {
          totalCustomerTypeData[cType] = {
            type: cType,
            totalPercentage: 0,
            data: { count: 0, acv: 0 },
          };
        }

        totalCustomerTypeData[cType].data.count += cData.data.count;
        totalCustomerTypeData[cType].data.acv += cData.data.acv;

        return {
          type: cType,
          totalPercentage: 0, // Will be computed later
          data: cData.data,
        };
      });

      // Compute percentage share for each customer type in the quarter
      customerEntries.forEach((entry) => {
        entry.totalPercentage = totalACV
          ? Math.round((entry.data.acv / totalACV) * 100)
          : 0;
      });

      // Accumulate grand totals for all quarters
      grandTotalACV += totalACV;
      grandTotalCount += totalCount;

      return {
        quarter,
        subDataInfo: {
          totalInfo: {
            type: "total",
            totalPercentage: 100,
            data: { count: totalCount, acv: totalACV },
          },
          dataList: customerEntries,
        },
      };
    });

    // Compute overall totals across all quarters
    const totalDataList = Object.values(totalCustomerTypeData).map((entry) => ({
      ...entry,
      totalPercentage: grandTotalACV
        ? Math.round((entry.data.acv / grandTotalACV) * 100)
        : 0,
    }));

    // Ensure final data is sorted chronologically by year and quarter
    const finalSortedData = formattedTableData.sort((a, b) => {
      const [yearA, quarterA] = a.quarter.match(/\d+/g)!.map(Number);
      const [yearB, quarterB] = b.quarter.match(/\d+/g)!.map(Number);
      return yearA !== yearB ? yearA - yearB : quarterA - quarterB;
    });

    return {
      rowTypes: Array.from(rowTypes),
      total: {
        quarter: "total",
        subDataInfo: {
          totalInfo: {
            type: "total",
            totalPercentage: 100,
            data: { count: grandTotalCount, acv: grandTotalACV },
          },
          dataList: totalDataList,
        },
      },
      data: finalSortedData,
    } as FinalResponse;
  }
}
