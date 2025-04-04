import { Box } from "@mui/material";
import D3Chart from "../../shared/components/charts/d3-chart.component";
import SharedTable from "../../shared/components/table.component";
import { TableHeaderType } from "../../shared/types/table.type";
import "./chart-info.style.css";

const header: TableHeaderType[] = [
  {
    label: "Name",
    fieldName: "name",
  },
  {
    label: "Name",
    fieldName: "price",
  },
];

const dataList = [
  {
    name: "ab",
    price: "10000",
  },
  {
    name: "bc",
    price: "10000",
  },
];
const stackedBarData = [
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

const donutData = [
  { label: "Product A", value: 60 },
  { label: "Product B", value: 40 },
];

const ChartInfo = () => {
  return (
    <Box className="main__wrapper" component="div">
      <Box className="top__wrapper" component="div">
        <Box component="div">
          <D3Chart data={stackedBarData} chartType="bar" />
        </Box>
        <Box component="div">
          <D3Chart data={donutData} chartType="donut" />
        </Box>
      </Box>
      <Box className="bottom__wrapper" component="div">
        <SharedTable headers={header} dataList={dataList} />
      </Box>
    </Box>
  );
};

export default ChartInfo;
