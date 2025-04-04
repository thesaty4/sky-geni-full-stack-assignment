import * as d3 from "d3";
import React, { useEffect, useRef } from "react";

/**
 * Represents a single data point for the donut chart.
 */
export interface DonutChartData {
  /** The label for the segment. */
  label: string;
  /** The numerical value associated with the segment. */
  value: number;
}

/**
 * Props for the DonutChart component.
 */
interface DonutChartProps {
  /** The data to be visualized in the donut chart. */
  data: DonutChartData[];
}

/**
 * A React component that renders a donut chart using D3.
 *
 * - Displays data as a segmented ring.
 * - Uses color coding to differentiate segments.
 * - Shows percentage and value labels outside each segment.
 * - Displays the total sum in the center.
 *
 * @param {DonutChartProps} props - The component props.
 * @returns {JSX.Element} The rendered donut chart.
 */
const DonutChart: React.FC<DonutChartProps> = ({ data }) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;
    d3.select(chartRef.current).selectAll("*").remove();

    const width = 500,
      height = 500,
      radius = Math.min(width, height) / 3;

    const svg = d3
      .select(chartRef.current) // selecting current chart ref
      .append("svg") // creating svg element
      .attr("width", width) // setting width
      .attr("height", height) // setting height
      .append("g") // it will align better position
      .attr("transform", `translate(${width / 2},${height / 2})`); // dynamically translate this

    // Create pie chart layout
    const pie = d3.pie<DonutChartData>().value((d) => d.value);

    const arc = d3
      .arc<d3.PieArcDatum<DonutChartData>>() // arc is used to create the shape of the donut
      .innerRadius(radius * 0.5) // inner radius of the donut
      .outerRadius(radius * 0.9); // outer radius of the donut

    const outerArc = d3
      .arc<d3.PieArcDatum<DonutChartData>>() // arc is used to create the shape of the donut
      .innerRadius(radius * 1.1) // inner radius of the donut
      .outerRadius(radius * 1.2); /// outer radius of the donut

    // Color scale for the donut segments
    const color = d3.scaleOrdinal(d3.schemeCategory10);

    // Draw donut slices
    svg
      .selectAll("path") // selecting all path elements
      .data(pie(data)) // binding data to the pie layout
      .join("path") // joining data to path elements
      .attr("d", arc) // creating the arc shape
      .attr("fill", (_d, i) => color(i.toString())) // filling with color
      .style("stroke", "#fff") // adding stroke color
      .style("stroke-width", "2px"); // adding stroke width

    // Calculate total value for percentage display
    const total = d3.sum(data, (d) => d.value);

    // Add label lines
    svg
      .selectAll("polyline") // selecting all polyline elements
      .data(pie(data)) // binding data to the pie layout
      .join("polyline") // joining data to polyline elements
      .attr("points", (d) => {
        // calculating points for the polyline
        const posA = arc.centroid(d);
        const posB = outerArc.centroid(d);
        const posC = [posB[0] + (posB[0] > 0 ? 10 : -10), posB[1]];
        return [posA, posB, posC].map((p) => p.join(",")).join(" ");
      })
      .attr("stroke", "gray") // adding stroke color
      .attr("fill", "none") // no fill
      .attr("stroke-width", "1px"); // adding stroke width

    // Add text labels
    svg
      .selectAll("text") // selecting all text elements
      .data(pie(data)) // binding data to the pie layout
      .join("text") // joining data to text elements
      .attr("transform", (d) => {
        // calculating position for the text
        const pos = outerArc.centroid(d);
        return `translate(${pos[0] * 1.2},${pos[1] * 1.2})`;
      })
      // adding text
      .attr("text-anchor", (d) =>
        (d.startAngle + d.endAngle) / 2 > Math.PI ? "end" : "start"
      )
      .style("font-size", "12px") // setting font size
      .style("fill", "#333") // setting text color
      .text(
        (d) =>
          `$${d.data.value}K (${Math.round((d.data.value / total) * 100)}%)`
      );

    // Display total in center
    svg
      .append("text") // adding text element
      .attr("text-anchor", "middle") // centering text
      .attr("dy", "0.3em") // vertical alignment
      .style("font-size", "14px") // setting font size
      .style("font-weight", "bold") // making text bold
      .text(`Total\n$${total}K`); // displaying total value
  }, [data]);

  return <div ref={chartRef} className="donut-chart"></div>;
};

export default DonutChart;
