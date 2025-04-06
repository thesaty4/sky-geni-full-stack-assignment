import {
  AllFileTypes,
  DashboardData,
  MODULE_WISE_MAPPER,
} from "../models/common.model";
import {
  CATEGORY_TYPE_ENUM,
  CustomerDataType,
  CustomerTableDataResponseType,
  FinalResponse,
  MODULE_NAMES,
  TableAPIInfo,
  customerTypeData,
} from "../models/customerType.model";
import { getRandomColor } from "../shared/utils/common.util";

/**
 * Service to handle customer type data processing.
 */
export class ChartInfoService {
  /**
   * Processes and returns data for the dashboard including bar chart, doughnut chart, and table data.
   * @returns {DashboardData} Processed dashboard data.
   */
  static getDashboardData(moduleName: MODULE_NAMES): DashboardData {
    const { type, quarter } = MODULE_WISE_MAPPER[moduleName];
    const fileData = MODULE_WISE_MAPPER[moduleName].fileData as Required<
      AllFileTypes[]
    >;
    // Extract unique quarters and sort them chronologically
    const quarters = [
      ...new Set(fileData.map((d) => d.closed_fiscal_quarter)),
    ].sort();

    const allType = [...new Set(fileData.map((fType) => fType[type]))];
    // Prepare bar chart data
    const barChartData = quarters.map((quarterKey) => {
      const allValuesQuarterly = allType.map(
        (avq) =>
          fileData.find((d) => d[quarter] === quarterKey && avq === d[type]) ||
          ({
            acv: 0,
          } as AllFileTypes)
      );

      return {
        quarter: quarterKey,
        total: allValuesQuarterly.reduce((pre, curr) => pre + curr.acv, 0),
        values: allValuesQuarterly.map((values, ind) => ({
          label: values[type],
          value: values.acv,
          color: ind > 1 ? getRandomColor() : ind % 2 ? "#1f77b4" : "#ff7f0e",
        })),
      };
    });

    // Compute doughnut chart data
    const totalExistingACV = customerTypeData
      .filter((d) => d.Cust_Type === CATEGORY_TYPE_ENUM.EXISTING_CUSTOMER)
      .reduce((sum, d) => sum + d.acv, 0);

    const totalNewACV = customerTypeData
      .filter((d) => d.Cust_Type === CATEGORY_TYPE_ENUM.NEW_CUSTOMER)
      .reduce((sum, d) => sum + d.acv, 0);

    let totalAVC = allType.reduce(
      (prev, d) => {
        const acv = fileData
          .filter((f) => f[type] === d)
          .reduce((sum, d) => sum + d.acv, 0);
        return { ...prev, total: prev.total + acv, [d]: acv };
      },
      { total: 0 }
    );

    return {
      barChart: barChartData as any,
      doughnutChart: totalAVC,
      tableData: this.getTableData(moduleName),
    };
  }

  /**
   * Generates and returns sorted table data for customer types, categorized by fiscal quarter.
   * The data includes total counts and ACV (Annual Contract Value) for each customer type
   * along with computed percentage distributions.
   *
   * @returns {FinalResponse} Formatted and sorted customer type table data.
   */
  static getTableData(moduleName: MODULE_NAMES): FinalResponse {
    const { type, quarter: configQuatre } = MODULE_WISE_MAPPER[moduleName];
    const fileData = MODULE_WISE_MAPPER[moduleName].fileData as Required<
      AllFileTypes[]
    >;

    // row type extracted
    const rowTypes = new Set(fileData.map((d) => d[type]));

    // Sort customer data by fiscal quarter in ascending order
    const sortedCustomerData = [...fileData].sort((a, b) =>
      a[configQuatre]?.toString().localeCompare(b[configQuatre]?.toString())
    );

    // Group records by quarter and customer type
    const groupedRecords = sortedCustomerData.reduce((acc, curr) => {
      // const { closed_fiscal_quarter: quarter, Cust_Type } = curr;
      // curr[type]
      // Initialize quarter and customer type if not present
      if (!acc[curr[configQuatre]]) acc[curr[configQuatre]] = {};
      if (!acc[curr[configQuatre]][curr[type]]) {
        acc[curr[configQuatre]][curr[type]] = {
          totalPercentage: 0,
          data: { count: 0, acv: 0 },
        };
      }

      // Accumulate customer count and ACV
      acc[curr[configQuatre]][curr[type]].data.count += curr.count;
      acc[curr[configQuatre]][curr[type]].data.acv += curr.acv;

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
