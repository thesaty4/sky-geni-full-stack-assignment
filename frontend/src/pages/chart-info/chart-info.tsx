import { Box } from "@mui/material";
import D3Chart from "../../shared/components/charts/d3-chart.component";
import Loader from "../../shared/components/loader.component";
import SharedTable from "../../shared/components/table/table.component";
import { useChartInfo } from "./api/chart-api.query";
import "./chart-info.style.css";

const ChartInfo = () => {
  const {
    isLoading,
    chartInfo: { donut, bar },
    tableData: { header, dataList },
  } = useChartInfo();

  if (isLoading) <Loader />;

  return (
    <Box className="main__wrapper" component="div">
      <Box className="header__wrapper" component="div">
        Won ACV mix by Customer Type
      </Box>
      <Box className="top__wrapper" component="div">
        <Box component="div">
          <D3Chart data={bar.data} chartType="bar" />
        </Box>
        <Box component="div">
          <D3Chart data={donut.data} chartType="donut" />
        </Box>
      </Box>
      <Box className="graph__footer__wrapper" component="div">
        <div className="dot__wrapper">
          <div className="dot first"></div>
          <span className="footer__sub-title">Existing Customer</span>
        </div>
        <div className="dot__wrapper">
          <div className="dot second"></div>
          <span className="footer__sub-title">New Customer</span>
        </div>
      </Box>
      <Box className="bottom__wrapper" component="div">
        <SharedTable headers={header} dataList={dataList} isFooterTotal />
      </Box>
    </Box>
  );
};

export default ChartInfo;
