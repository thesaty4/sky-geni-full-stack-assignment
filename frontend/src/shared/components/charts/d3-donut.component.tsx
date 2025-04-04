import * as d3 from "d3";
import React, { useEffect, useRef } from "react";

export interface DonutChartData {
  label: string;
  value: number;
}

interface DonutChartProps {
  data: DonutChartData[];
}

const DonutChart: React.FC<DonutChartProps> = ({ data }) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;
    d3.select(chartRef.current).selectAll("*").remove();

    const width = 500,
      height = 500,
      radius = Math.min(width, height) / 5;

    const svg = d3
      .select(chartRef.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`);

    const pie = d3.pie<DonutChartData>().value((d) => d.value);

    const arc = d3
      .arc<d3.PieArcDatum<DonutChartData>>()
      .innerRadius(radius * 0.5)
      .outerRadius(radius * 0.9);

    const outerArc = d3
      .arc<d3.PieArcDatum<DonutChartData>>()
      .innerRadius(radius * 1.1)
      .outerRadius(radius * 1.2); // Move labels slightly outward

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    // Draw donut slices
    svg
      .selectAll("path")
      .data(pie(data))
      .join("path")
      .attr("d", arc)
      .attr("fill", (d, i) => color(i.toString()))
      .style("stroke", "#fff")
      .style("stroke-width", "2px");

    const total = d3.sum(data, (d) => d.value);

    svg
      .selectAll("polyline")
      .data(pie(data))
      .join("polyline")
      .attr("points", (d) => {
        const posA = arc.centroid(d); // Center of the slice
        const posB = outerArc.centroid(d); // Slightly outside the slice
        const posC = [
          posB[0] + (posB[0] > 0 ? 10 : -10), // Offset to avoid overlap
          posB[1],
        ]; // Further out but stable

        return [posA, posB, posC].map((p) => p.join(",")).join(" ");
      })
      .attr("stroke", "gray")
      .attr("fill", "none")
      .attr("stroke-width", "1px");

    // Add labels aligned properly
    svg
      .selectAll("text")
      .data(pie(data))
      .join("text")
      .attr("transform", (d) => {
        const pos = outerArc.centroid(d);
        return `translate(${pos[0] * 1.2},${pos[1] * 1.2})`; // Extend for better visibility
      })
      .attr("text-anchor", (d) =>
        (d.startAngle + d.endAngle) / 2 > Math.PI ? "end" : "start"
      )
      .style("font-size", "12px")
      .style("fill", "#333")
      .text(
        (d) =>
          `$${d.data.value}K (${Math.round((d.data.value / total) * 100)}%)`
      );

    // Add total in center
    svg
      .append("text")
      .attr("text-anchor", "middle")
      .attr("dy", "0.3em")
      .style("font-size", "14px")
      .style("font-weight", "bold")
      .text(`Total\n$${total}K`);
  }, [data]);

  return <div ref={chartRef} className="donut-chart"></div>;
};

export default DonutChart;
