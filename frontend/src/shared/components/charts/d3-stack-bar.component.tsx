import * as d3 from "d3";
import React, { useEffect, useRef } from "react";

/**
 * Represents a single data point for the stacked bar chart.
 */
export interface StackChartData {
  /** The quarter (e.g., "Q1", "Q2"). */
  quarter: string;
  /** The total value for the quarter. */
  total: number;
  /** The breakdown of values for different categories within the quarter. */
  values: {
    category: string;
    value: number;
    color: string;
  }[];
}

/**
 * Props for the StackedBarChart component.
 */
interface StackedBarChartProps {
  /** The dataset to visualize in the stacked bar chart. */
  data: StackChartData[];
}

/**
 * A stacked bar chart component built with D3 and React.
 * It visualizes grouped data across different quarters.
 */
const StackedBarChart: React.FC<StackedBarChartProps> = ({ data }) => {
  /** Reference to the chart container. */
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return; // Exit if no container is available

    // Clear previous chart before rendering a new one
    d3.select(chartRef.current).selectAll("*").remove();

    // Chart dimensions
    const width = 800,
      height = 500,
      margin = { top: 50, right: 30, bottom: 50, left: 80 };

    // Create the SVG canvas
    const svg = d3
      .select(chartRef.current) // selecting current chart ref
      .append("svg") // creating svg element
      .attr("width", width) // setting width
      .attr("height", height); // setting height

    // X-axis scale based on quarters
    const xScale = d3
      .scaleBand() // band scale for categorical data
      .domain(data.map((d) => d.quarter)) // mapping quarters to x-axis
      .range([margin.left, width - margin.right]) // setting range
      .padding(0.4); // padding between bars

    // Y-axis scale based on total values
    const yScale = d3
      .scaleLinear() // linear scale for numerical data
      .domain([0, d3.max(data, (d) => d.total)! * 1.1]) // setting domain
      .nice() // rounding the domain
      .range([height - margin.bottom, margin.top]); // setting range

    // Draw the y-axis with grid lines
    const yAxis = svg
      .append("g") // creating y-axis group
      .attr("transform", `translate(${margin.left},0)`); // positioning y-axis

    yAxis
      .call(d3.axisLeft(yScale).ticks(6)) // adding ticks
      .selectAll(".tick line") // selecting tick lines
      .attr("x2", width - margin.left - margin.right) // setting line length
      .attr("stroke", "#ccc") // light gray color
      .attr("stroke-width", 1) // setting line width
      .attr("stroke-dasharray", "4,2"); // dashed lines

    // Create groups for each bar
    const barGroups = svg
      .append("g") // creating group for bars
      .selectAll("g") // selecting all groups
      .data(data) // binding data
      .enter() // creating new groups
      .append("g") // appending new group
      .attr("transform", (d) => `translate(${xScale(d.quarter)},0)`); // positioning groups

    // Draw stacked bars
    barGroups
      .selectAll("rect") // selecting all rectangles
      .data((d) => {
        // Flatten the data for each quarter
        let start = 0;
        return d.values.map((v) => {
          const bar = { ...v, start, end: start + v.value };
          start += v.value;
          return bar;
        });
      })
      .enter() // creating new rectangles
      .append("rect") // appending rectangles
      .attr("x", 0) // x position of the rectangle
      .attr("y", (d) => yScale(d.end)) // y position based on end value
      .attr("height", (d) => yScale(d.start) - yScale(d.end)) // height based on start and end values
      .attr("width", xScale.bandwidth()) // width of the rectangle
      .attr("fill", (d) => d.color); // fill color based on category

    // Add labels inside bars
    barGroups
      .selectAll(".bar-label") // selecting all bar labels
      .data((d) => {
        // Flatten the data for each quarter
        let start = 0;
        return d.values.map((v) => {
          const bar = { ...v, start, end: start + v.value };
          start += v.value;
          return bar;
        });
      })
      .enter() // creating new labels
      .append("text") // appending text labels
      .attr("class", "bar-label") // class for styling
      .attr("x", xScale.bandwidth() / 2) // center x position
      .attr("y", (d) => yScale(d.end) + (yScale(d.start) - yScale(d.end)) / 2) // center y position
      .attr("dy", "0.35em") // vertical alignment
      .attr("text-anchor", "middle") // center text
      .style("fill", "white") // text color
      .style("font-size", "14px") // font size
      .style("font-weight", "bold") // bold text
      .text((d) => `$${d.value}K`); // display value inside bar

    // Add total value labels above bars
    barGroups
      .append("text") // appending total value labels
      .attr("class", "total-label") // class for styling
      .attr("x", xScale.bandwidth() / 2) // center x position
      .attr("y", (d) => yScale(d.total) - 10) // position above the bar
      .attr("text-anchor", "middle") // center text
      .style("font-size", "14px") // font size
      .style("font-weight", "bold") // bold text
      .style("fill", "black") // text color
      .text((d) => `$${d.total}K`); // display total value

    // Draw the x-axis
    svg
      .append("g") // creating x-axis group
      .attr("transform", `translate(0,${height - margin.bottom})`) // positioning x-axis
      .call(d3.axisBottom(xScale)); // adding x-axis
  }, [data]);

  return <div ref={chartRef} className="stacked-bar-chart"></div>;
};

export default StackedBarChart;
