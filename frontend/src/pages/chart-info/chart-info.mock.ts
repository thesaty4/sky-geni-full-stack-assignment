import { TableHeaderType } from "../../shared/types";

/**
 * @deprecated chartHeader is deprecated and will be removed in future releases.
 */
export const chartHeader: TableHeaderType[] = [
  {
    label: "Closed Financial Year",
    fieldName: "closeFinancialYear",
    width: "150px",
    bgColor: "",
    children: [
      {
        label: "Cust Type",
        fieldName: "custType",
      },
    ],
  },
  {
    label: "2023-Q3",
    fieldName: "2023-Q3",
    children: [
      {
        label: "Count",
        fieldName: "count",
      },
      {
        label: "ACV",
        fieldName: "acv",
        prefixText: "$",
      },
      {
        label: "% of Total",
        fieldName: "total",
        postfixText: "%",
        width: "95px",
      },
    ],
  },
  {
    label: "2023-Q4",
    fieldName: "2023-Q4",
    children: [
      {
        label: "Count",
        fieldName: "count",
      },
      {
        label: "ACV",
        fieldName: "acv",
        prefixText: "$",
      },
      {
        label: "% of Total",
        fieldName: "total",
        postfixText: "%",
        width: "95px",
      },
    ],
  },

  {
    label: "Total",
    fieldName: "total",
    children: [
      {
        label: "Count",
        fieldName: "count",
      },
      {
        label: "ACV",
        fieldName: "acv",
        prefixText: "$",
      },
      {
        label: "% of Total",
        fieldName: "total",
        postfixText: "%",
        width: "95px",
      },
    ],
  },
];

/**
 * @deprecated chartDataList is deprecated and will be removed in future releases.
 */
export const chartDataList = [
  {
    "2023-Q3": {
      count: 100,
      acv: 5000,
      total: 20,
    },
    "2023-Q4": {
      count: 100,
      acv: 5000,
      total: 20,
    },
    closeFinancialYear: {
      custType: "Existing Customer",
    },
    total: {
      count: 100,
      acv: 5000,
      total: 20,
    },
  },
  {
    "2023-Q3": {
      count: 100,
      acv: 5000,
      total: 20,
    },
    "2023-Q4": {
      count: 100,
      acv: 5000,
      total: 20,
    },
    closeFinancialYear: {
      custType: "New Customer",
    },
    total: {
      count: 100,
      acv: 5000,
      total: 20,
    },
  },

  {
    "2023-Q3": {
      count: 100,
      acv: 5000,
      total: 20,
    },
    "2023-Q4": {
      count: 100,
      acv: 5000,
      total: 20,
    },
    closeFinancialYear: {
      custType: "Total",
    },
    total: {
      count: 100,
      acv: 5000,
      total: 20,
    },
  },
];

export const stackedBarData = [
  {
    quarter: "2023-Q3",
    total: 2305,
    values: [
      { category: "Blue", value: 1322, color: "#1f77b4" },
      { category: "Orange", value: 983, color: "#ff7f0e" },
    ],
  },
  {
    quarter: "2023-Q4",
    total: 1512,
    values: [
      { category: "Blue", value: 1125, color: "#1f77b4" },
      { category: "Orange", value: 387, color: "#ff7f0e" },
    ],
  },
  {
    quarter: "2024-Q1",
    total: 1673,
    values: [
      { category: "Blue", value: 1360, color: "#1f77b4" },
      { category: "Orange", value: 313, color: "#ff7f0e" },
    ],
  },
  {
    quarter: "2024-Q2",
    total: 872,
    values: [
      { category: "Blue", value: 648, color: "#1f77b4" },
      { category: "Orange", value: 225, color: "#ff7f0e" },
    ],
  },
];

export const donutData = [
  { label: "Product A", value: 60 },
  { label: "Product B", value: 40 },
];
