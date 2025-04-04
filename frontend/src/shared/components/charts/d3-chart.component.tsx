import React from "react";
import DonutChart, { DonutChartData } from "./d3-donut.component";
import StackedBarChart, { StackChartData } from "./d3-stack-bar.component";

interface D3ChartProps {
  data: DonutChartData[] | StackChartData[];
  chartType: "bar" | "donut";
}

const D3Chart: React.FC<D3ChartProps> = ({ data, chartType }) => {
  return (
    <div className="chart-container">
      {chartType === "bar" ? (
        <StackedBarChart data={data as StackChartData[]} />
      ) : (
        <DonutChart data={data as DonutChartData[]} />
      )}
    </div>
  );
};

export default D3Chart;
