import React from "react";
import DonutChart, { DonutChartData } from "./d3-donut.component";
import StackedBarChart, { StackChartData } from "./d3-stack-bar.component";

/**
 * Props for the D3Chart component.
 *
 * @property {DonutChartData[] | StackChartData[]} data - The dataset to be visualized.
 * @property {"bar" | "donut"} chartType - Type of chart to render: either "bar" for stacked bar chart or "donut" for donut chart.
 */
interface D3ChartProps {
  data: DonutChartData[] | StackChartData[];
  chartType: "bar" | "donut";
}

/**
 * D3Chart is a wrapper component that renders either a DonutChart or StackedBarChart
 * depending on the `chartType` prop.
 *
 * @param {D3ChartProps} props - The props for the component.
 * @returns {JSX.Element} Rendered chart component.
 */
const D3Chart: React.FC<D3ChartProps> = ({ data, chartType }) => {
  /** This will render the chart, you can add as many as you want */
  const renderChart = () => {
    switch (chartType) {
      case "bar":
        return <StackedBarChart data={data as StackChartData[]} />;
      case "donut":
        return <DonutChart data={data as DonutChartData[]} />;
    }
  };

  return <div className="chart-container">{renderChart()}</div>;
};

export default D3Chart;
