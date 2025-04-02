import { Box } from "@mui/material";
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

const ChartInfo = () => {
  return (
    <Box className="main__wrapper" component="div">
      <Box className="top__wrapper" component="div">
        <Box component="div">Left Graph </Box>
        <Box component="div">Right Graph</Box>
      </Box>
      <Box className="bottom__wrapper" component="div">
        <SharedTable headers={header} dataList={dataList} />
      </Box>
    </Box>
  );
};

export default ChartInfo;
