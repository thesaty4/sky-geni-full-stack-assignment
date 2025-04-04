import * as d3 from "d3";
import React, { useEffect, useRef } from "react";

export interface StackChartData {
  quarter: string;
  total: number;
  values: { category: string; value: number; color: string }[];
}

interface StackedBarChartProps {
  data: StackChartData[];
}

const StackedBarChart: React.FC<StackedBarChartProps> = ({ data }) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    d3.select(chartRef.current).selectAll("*").remove();

    const width = 800,
      height = 500,
      margin = { top: 50, right: 30, bottom: 50, left: 80 };

    const svg = d3
      .select(chartRef.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    const xScale = d3
      .scaleBand()
      .domain(data.map((d) => d.quarter))
      .range([margin.left, width - margin.right])
      .padding(0.4);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.total)! * 1.1])
      .nice()
      .range([height - margin.bottom, margin.top]);

    // Append only horizontal lines at breakpoints
    const yAxis = svg
      .append("g")
      .attr("transform", `translate(${margin.left},0)`);

    yAxis
      .call(d3.axisLeft(yScale).ticks(6)) // Ensure only exact breakpoints are used
      .selectAll(".tick line")
      .attr("x2", width - margin.left - margin.right) // Extend only to chart width
      .attr("stroke", "#ccc") // Light gray for subtle effect
      .attr("stroke-width", 1)
      .attr("stroke-dasharray", "4,2"); // Dashed line for breakpoints only

    const barGroups = svg
      .append("g")
      .selectAll("g")
      .data(data)
      .enter()
      .append("g")
      .attr("transform", (d) => `translate(${xScale(d.quarter)},0)`);

    barGroups
      .selectAll("rect")
      .data((d) => {
        let start = 0;
        return d.values.map((v) => {
          const bar = { ...v, start, end: start + v.value };
          start += v.value;
          return bar;
        });
      })
      .enter()
      .append("rect")
      .attr("x", 0)
      .attr("y", (d) => yScale(d.end))
      .attr("height", (d) => yScale(d.start) - yScale(d.end))
      .attr("width", xScale.bandwidth())
      .attr("fill", (d) => d.color);

    // Inside bar labels
    barGroups
      .selectAll(".bar-label")
      .data((d) => {
        let start = 0;
        return d.values.map((v) => {
          const bar = { ...v, start, end: start + v.value };
          start += v.value;
          return bar;
        });
      })
      .enter()
      .append("text")
      .attr("class", "bar-label")
      .attr("x", xScale.bandwidth() / 2)
      .attr("y", (d) => yScale(d.end) + (yScale(d.start) - yScale(d.end)) / 2)
      .attr("dy", "0.35em")
      .attr("text-anchor", "middle")
      .style("fill", "white")
      .style("font-size", "14px")
      .style("font-weight", "bold")
      .text((d) => `$${d.value}K`);

    // Total value on top of bars
    barGroups
      .append("text")
      .attr("class", "total-label")
      .attr("x", xScale.bandwidth() / 2)
      .attr("y", (d) => yScale(d.total) - 10)
      .attr("text-anchor", "middle")
      .style("font-size", "14px")
      .style("font-weight", "bold")
      .style("fill", "black")
      .text((d) => `$${d.total}K`);

    // X Axis
    svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(xScale));
  }, [data]);

  return <div ref={chartRef} className="stacked-bar-chart"></div>;
};

export default StackedBarChart;
