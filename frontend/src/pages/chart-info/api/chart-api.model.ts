import { DonutChartData } from "../../../shared/components/charts/d3-donut.component";
import { StackChartData } from "../../../shared/components/charts/d3-stack-bar.component";
import { TableHeaderType } from "../../../shared/types";
import { toTitleCase } from "../../../shared/utils/common.util";
import {
  INNER_CHILD_POSTFIX_TEXT_MAP,
  INNER_CHILD_PREFIX_TEXT_MAP,
  INNER_CHILD_WIDTH_MAP,
  INNER_LABEL_MAP,
} from "./chart-api.const";
import {
  CustomerDataType,
  DashboardDataResponse,
  TableAPIInfo,
  TableAPIResponse,
} from "./chart-api.type";

/**
 * Class representing a Chart Data Model that transforms API response data
 * into structured header and data lists for table display.
 */
export class ChartTableModel {
  /**
   * The header configuration for the table
   * @type {TableHeaderType[]}
   */
  header: TableHeaderType[] = [];

  /**
   * The transformed data list for the table
   * @type {Record<string, unknown>[]}
   */
  dataList: Record<string, unknown>[] = [];

  /**
   * Creates an instance of ChartModel.
   * @param {TableAPIResponse} [input] - The API response data to transform
   */
  constructor(input?: TableAPIResponse) {
    if (input) {
      this.initializeHeader(input);
      this.initializeDataList(input);
      // console.log("your item is : ", this);
    }
  }

  /**
   * Initializes the table header structure from API data
   * @private
   * @param {TableAPIResponse} input - The API response data
   */
  private initializeHeader(input: TableAPIResponse): void {
    const baseHeader: TableHeaderType[] = [
      {
        label: "Closed Financial Year",
        fieldName: "closeFinancialYear",
        width: "150px",
        bgColor: "",
        children: [{ label: "Cust Type", fieldName: "custType" }],
      },
    ];

    const quarterHeaders = this.processQuarters(input.data, input.total);
    this.header = [...baseHeader, ...quarterHeaders];
  }

  /**
   * Processes quarter data into table headers
   * @private
   * @param {TableAPIInfo[]} quarters - Array of quarter data
   * @param {TableAPIInfo} totalInfo - Total information object
   * @returns {TableHeaderType[]} Array of processed header items
   */
  private processQuarters(
    quarters: TableAPIInfo[],
    totalInfo: TableAPIInfo
  ): TableHeaderType[] {
    return quarters.reduce((acc: TableHeaderType[], quarter, index) => {
      const quarterHeader = this.createQuarterHeader(quarter);
      const isLastQuarter = index === quarters.length - 1;

      if (isLastQuarter) {
        const totalHeader = this.createTotalHeader(totalInfo);
        return [...acc, quarterHeader, totalHeader];
      }

      return [...acc, quarterHeader];
    }, []);
  }

  /**
   * Creates a header item for a quarter
   * @private
   * @param {TableAPIInfo} quarter - Quarter data object
   * @returns {TableHeaderType} Header configuration for the quarter
   */
  private createQuarterHeader(quarter: TableAPIInfo): TableHeaderType {
    return {
      label: quarter.quarter,
      fieldName: quarter.quarter,
      children: [
        ...this.createSubDataHeaders(quarter.subDataInfo.dataList[0].data),
        this.createTotalSubHeader(quarter.subDataInfo.totalInfo),
      ],
    };
  }

  /**
   * Creates sub-data headers from customer data
   * @private
   * @param {CustomerDataType["data"]} data - Customer data object
   * @returns {TableHeaderType[]} Array of sub-data headers
   */
  private createSubDataHeaders(
    data: CustomerDataType["data"]
  ): TableHeaderType[] {
    return Object.keys(data).map((item) => ({
      label: INNER_LABEL_MAP[item] || toTitleCase(item),
      fieldName: item,
      prefixText: INNER_CHILD_PREFIX_TEXT_MAP[item],
      postfixText: INNER_CHILD_POSTFIX_TEXT_MAP[item],
      width: INNER_CHILD_WIDTH_MAP[item],
    }));
  }

  /**
   * Creates a total sub-header item
   * @private
   * @param {CustomerDataType} totalInfo - Total information object
   * @returns {TableHeaderType} Header configuration for the total
   */
  private createTotalSubHeader(totalInfo: CustomerDataType): TableHeaderType {
    return {
      label: INNER_LABEL_MAP[totalInfo.type] || toTitleCase(totalInfo.type),
      fieldName: totalInfo.type,
      prefixText: INNER_CHILD_PREFIX_TEXT_MAP[totalInfo.type],
      postfixText: INNER_CHILD_POSTFIX_TEXT_MAP[totalInfo.type],
      width: INNER_CHILD_WIDTH_MAP[totalInfo.type],
    };
  }

  /**
   * Creates a total header item
   * @private
   * @param {TableAPIInfo} totalInfo - Total information object
   * @returns {TableHeaderType} Header configuration for the total section
   */
  private createTotalHeader(totalInfo: TableAPIInfo): TableHeaderType {
    return {
      label: toTitleCase(totalInfo.quarter ?? "total"),
      fieldName: totalInfo.quarter ?? "total",
      children: [
        ...this.createSubDataHeaders(totalInfo.subDataInfo.dataList[0].data),
        this.createTotalSubHeader(totalInfo.subDataInfo.totalInfo),
      ],
    };
  }

  /**
   * Initializes the data list from API response
   * @private
   * @param {TableAPIResponse} input - The API response data
   */
  private initializeDataList(input: TableAPIResponse): void {
    const { data, total, rowTypes } = input;
    this.dataList = [
      ...rowTypes.map((type) =>
        this.createCustomerEntry(type.type, data, total)
      ),
      this.createTotalEntry(data, total),
    ];
  }

  /**
   * Creates a customer data entry for the data list
   * @private
   * @param {string} customerType - Type of customer (Existing/New)
   * @param {TableAPIInfo[]} quarters - Array of quarter data
   * @param {TableAPIInfo} globalTotal - Global total information
   * @returns {Record<string, unknown>} Customer data entry
   */
  private createCustomerEntry(
    customerType: string,
    quarters: TableAPIInfo[],
    globalTotal: TableAPIInfo
  ): Record<string, unknown> {
    const entry: Record<string, unknown> = {
      closeFinancialYear: { custType: customerType },
    };

    quarters.forEach((quarter) => {
      const customerData = quarter.subDataInfo.dataList.find(
        (d) => d.type === customerType
      );
      entry[quarter.quarter] = {
        count: customerData?.data.count || 0,
        acv: customerData?.data.acv || 0,
        total: customerData?.totalPercentage || 0,
      };
    });

    const globalCustomerData = globalTotal.subDataInfo.dataList.find(
      (d) => d.type === customerType
    );
    entry.total = {
      count: globalCustomerData?.data.count || 0,
      acv: globalCustomerData?.data.acv || 0,
      total: globalCustomerData?.totalPercentage || 0,
    };

    return entry;
  }

  /**
   * Creates a total data entry for the data list
   * @private
   * @param {TableAPIInfo[]} quarters - Array of quarter data
   * @param {TableAPIInfo} globalTotal - Global total information
   * @returns {Record<string, unknown>} Total data entry
   */
  private createTotalEntry(
    quarters: TableAPIInfo[],
    globalTotal: TableAPIInfo
  ): Record<string, unknown> {
    const entry: Record<string, unknown> = {
      closeFinancialYear: { custType: "Total" },
    };

    quarters.forEach((quarter) => {
      entry[quarter.quarter] = {
        count: quarter.subDataInfo.totalInfo.data.count,
        acv: quarter.subDataInfo.totalInfo.data.acv,
        total: quarter.subDataInfo.totalInfo.totalPercentage,
      };
    });

    entry.total = {
      count: globalTotal.subDataInfo.totalInfo.data.count,
      acv: globalTotal.subDataInfo.totalInfo.data.acv,
      total: globalTotal.subDataInfo.totalInfo.totalPercentage,
    };

    return entry;
  }
}

export class ChartDonutModel {
  data: DonutChartData[] = [];
  constructor(input?: DashboardDataResponse) {
    if (input?.doughnutChart) {
      const {
        doughnutChart,
        tableData: { rowTypes },
      } = input;
      this.data = Object.entries(doughnutChart)
        .filter(([key]) => key !== "total")
        .map(([key, value]) => ({
          label: key,
          value: value,

          // exactly same color for the donut chart
          color: rowTypes.find((item) => item.type === key)?.color || "",
        }));
    }
  }
}

export class ChartStackModel {
  data: StackChartData[] = [];
  constructor(input?: DashboardDataResponse) {
    if (input?.barChart) {
      const { barChart } = input;
      this.data = barChart.map((item) => ({
        quarter: item.quarter ?? "",
        total: item.total,
        values: item.values.map((value) => ({
          label: value.label,
          value: value.value,
          color: value.color,
        })),
      }));
    }
  }
}
