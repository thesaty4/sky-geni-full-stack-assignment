import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import D3Chart from "../../shared/components/charts/d3-chart.component";
import Loader from "../../shared/components/loader.component";
import SharedTable from "../../shared/components/table/table.component";
import { MODULE_NAMES } from "../../shared/constant/common.const";
import { useChartInfo } from "./api/chart-api.query";
import { MODULE_WISE_MAPPER, ModuleInfoType } from "./chart-info.const";
import "./chart-info.style.css";

/**
 * Component that displays chart and table data for a specific module
 * @param {ChartInfoProps} props - Component props
 * @returns {JSX.Element} The chart information display component
 */
const ChartInfo = () => {
  const { module } = useParams<{ module: MODULE_NAMES }>();
  const [moduleInfo, setModuleInfo] = useState<ModuleInfoType | null>(null);

  const {
    isLoading,
    chartInfo: { donut, bar },
    tableData: { header, dataList },
  } = useChartInfo();

  /**
   * Sets module information based on route parameter
   */
  useEffect(() => {
    if (module && MODULE_WISE_MAPPER[module]) {
      setModuleInfo(MODULE_WISE_MAPPER[module]);
    }
  }, [module]);

  if (isLoading) {
    return <Loader />;
  }

  if (!moduleInfo) {
    return (
      <Box className="main__wrapper">
        <Typography variant="h6" color="error">
          Module not found
        </Typography>
      </Box>
    );
  }

  return (
    <Box className="main__wrapper">
      {/* Header Section */}
      <Box className="header__wrapper">
        <Typography variant="h4" component="h1">
          {moduleInfo.header}
        </Typography>
      </Box>

      {/* Charts Section */}
      <Box className="top__wrapper">
        <Box className="chart-container">
          <D3Chart data={bar.data} chartType="bar" />
        </Box>
        <Box className="chart-container">
          <D3Chart data={donut.data} chartType="donut" />
        </Box>
      </Box>

      {/* Chart Legend */}
      <Box className="graph__footer__wrapper">
        <LegendItem colorClass="first" label="Existing Customer" />
        <LegendItem colorClass="second" label="New Customer" />
      </Box>

      {/* Data Table Section */}
      <Box className="bottom__wrapper">
        <SharedTable
          headers={header}
          dataList={dataList}
          isFooterTotal
          aria-label="Customer data table"
        />
      </Box>
    </Box>
  );
};

/**
 * Component for displaying a chart legend item
 * @param {Object} props - Component props
 * @param {string} props.colorClass - CSS class for the color dot
 * @param {string} props.label - Text label for the legend item
 * @returns {JSX.Element} Legend item component
 */
const LegendItem = ({
  colorClass,
  label,
}: {
  colorClass: string;
  label: string;
}) => (
  <Box className="dot__wrapper">
    <Box className={`dot ${colorClass}`} />
    <Typography variant="body1" className="footer__sub-title">
      {label}
    </Typography>
  </Box>
);

export default ChartInfo;
