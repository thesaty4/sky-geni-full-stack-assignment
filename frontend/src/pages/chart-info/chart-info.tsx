import { Box } from "@mui/material";
import D3Chart from "../../shared/components/charts/d3-chart.component";
import Loader from "../../shared/components/loader.component";
import SharedTable from "../../shared/components/table/table.component";
import { useChartInfo } from "./api/chart-api.query";
import { donutData, stackedBarData } from "./chart-info.mock";
import "./chart-info.style.css";

const ChartInfo = () => {
  const {
    isLoading,
    tableData: { header, dataList },
  } = useChartInfo();

  if (isLoading) <Loader />;

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
        <SharedTable headers={header} dataList={dataList} isFooterTotal />
      </Box>
    </Box>
  );
};

export default ChartInfo;
