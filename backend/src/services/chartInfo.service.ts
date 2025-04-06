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

export class ChartInfoService {
  /**
   * Transforms raw module data into dashboard visualization formats
   *
   * @static
   * @param {MODULE_NAMES} moduleName - The module identifier to process data for
   * @returns {DashboardData} Object containing bar chart, doughnut chart, and table data
   *
   * @property {Array} barChart - Quarterly ACV data with customer type breakdown
   * @property {Object} doughnutChart - Total ACV distribution by customer type
   * @property {FinalResponse} tableData - Detailed quarterly metrics
   */
  static getDashboardData(moduleName: MODULE_NAMES): DashboardData {
    const { type, quarter } = MODULE_WISE_MAPPER[moduleName];
    const fileData = MODULE_WISE_MAPPER[moduleName].fileData as Required<
      AllFileTypes[]
    >;
    const rowWiseInfo = new Map();

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
          color: rowWiseInfo
            .set(
              values[type],
              ind > 1 ? getRandomColor() : ind % 2 ? "#1f77b4" : "#ff7f0e"
            )
            .get(values[type]),
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
      tableData: this.getTableData(
        moduleName,
        Array.from(rowWiseInfo.entries())
      ),
    };
  }

  /**
   * Processes raw customer data into structured table format with calculated metrics
   *
   * @static
   * @param {MODULE_NAMES} moduleName - The module identifier to process
   * @returns {FinalResponse} Structured response containing:
   *
   * @property {Array<string>} rowTypes - Unique customer types in dataset
   * @property {TableAPIInfo} total - Aggregated totals across all quarters
   * @property {Array<TableAPIInfo>} data - Sorted quarterly metrics including:
   *   - ACV and count values
   *   - Percentage distributions
   *   - Quarterly totals
   *
   * @description
   * Performs the following transformations:
   * 1. Groups records by fiscal quarter and customer type
   * 2. Calculates percentage distributions
   * 3. Aggregates grand totals
   * 4. Sorts quarters chronologically
   */
  static getTableData(
    moduleName: MODULE_NAMES,
    rowWiseInfo: [string, string][]
  ): FinalResponse {
    const { type, quarter: configQuatre } = MODULE_WISE_MAPPER[moduleName];
    const fileData = MODULE_WISE_MAPPER[moduleName].fileData as Required<
      AllFileTypes[]
    >;

    // Sort dynamic data by fiscal quarter in ascending order
    const sortedCustomerData = [...fileData].sort((a, b) =>
      a[configQuatre]?.toString().localeCompare(b[configQuatre]?.toString())
    );

    // Group records by quarter and dynamic type
    const groupedRecords = sortedCustomerData.reduce((acc, curr) => {
      // Initialize quarter and dynamic type if not present
      if (!acc[curr[configQuatre]]) acc[curr[configQuatre]] = {};
      if (!acc[curr[configQuatre]][curr[type]]) {
        acc[curr[configQuatre]][curr[type]] = {
          totalPercentage: 0,
          data: { count: 0, acv: 0 },
        };
      }

      // Accumulate dynamic count and ACV
      acc[curr[configQuatre]][curr[type]].data.count += curr.count;
      acc[curr[configQuatre]][curr[type]].data.acv += curr.acv;

      return acc;
    }, {} as CustomerTableDataResponseType);

    let grandTotalACV = 0;
    let grandTotalCount = 0;
    const totalEntityTypeData: Record<string, CustomerDataType> = {};

    // Transform grouped records into a structured response
    const formattedTableData: TableAPIInfo[] = Object.entries(
      groupedRecords
    ).map(([quarter, data]) => {
      let totalACV = 0;
      let totalCount = 0;

      // Process each dynamic type within the quarter
      const entityEntries = Object.entries(data).map(([cType, cData]) => {
        totalACV += cData.data.acv;
        totalCount += cData.data.count;

        // Track cumulative total across all quarters
        if (!totalEntityTypeData[cType]) {
          totalEntityTypeData[cType] = {
            type: cType,
            totalPercentage: 0,
            data: { count: 0, acv: 0 },
          };
        }

        totalEntityTypeData[cType].data.count += cData.data.count;
        totalEntityTypeData[cType].data.acv += cData.data.acv;

        return {
          type: cType,
          totalPercentage: 0, // Will be computed later
          data: cData.data,
        };
      });

      // Compute percentage share for each customer type in the quarter
      entityEntries.forEach((entry) => {
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
          dataList: entityEntries,
        },
      };
    });

    // Compute overall totals across all quarters
    const totalDataList = Object.values(totalEntityTypeData).map((entry) => ({
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

    const rowTypes = rowWiseInfo
      .filter(([key]) => key !== undefined)
      .map(
        ([key, value]) =>
          ({
            color: value,
            type: key,
          } as FinalResponse["rowTypes"][number])
      );

    return {
      rowTypes,
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
