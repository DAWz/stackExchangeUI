import * as d3 from "d3";
import { useEffect, useRef } from "react";
import Spinner from "../Spinner/Spinner";
import { useResizeObserver } from "./useResizeObserver";

export const HorizontalBarChart = ({
  data = [],
  svgWrapperRef,
  margin = { top: 20, right: 10, bottom: 100, left: 30 },
}) => {
  const dimensions = useResizeObserver(svgWrapperRef);
  const svgRef = useRef(null);

  useEffect(
    () => {
      if (!svgRef?.current || !dimensions) return;

      const innerWidth = dimensions?.width - margin.right;
      const innerHeight = 500 - (margin.top + margin.bottom);
      const maxValue = Math.max(...data?.map(({ value }) => value));

      const svg = d3.select(svgRef?.current);

      const xScale = d3
        .scaleBand()
        .domain([...data?.map(({ label }) => label)])
        .rangeRound([margin.left, innerWidth])
        .padding(0.5);

      const yScale = d3
        .scaleLinear()
        .domain([0, Math.max(maxValue, 1)])
        .rangeRound([innerHeight, margin.top]);

      const xAxis = d3.axisBottom(xScale).ticks(data?.length);
      svg
        .select(".x-axis")
        .style("transform", `translateY(${innerHeight}px)`)
        .style("color", "#4b4c4f")
        .style("font-size", 12)
        .call(xAxis)
        .selectAll("text")
        .style("text-anchor", "middle");
      if (data?.length > 5) {
        svg
          .select(".x-axis")
          .selectAll("text")
          .style("text-anchor", "end")
          .attr("dx", "-4px")
          .attr("transform", "rotate(-90)");
      } else {
        svg
          .select(".x-axis")
          .selectAll("text")
          .style("text-anchor", "middle")
          .attr("dx", "0px")
          .attr("transform", "rotate(0)");
      }

      const yAxis = d3.axisLeft(yScale).ticks(5);
      svg
        .select(".y-axis")
        .style("transform", `translateX(${margin.left}px)`)
        .style("color", "#4b4c4f")
        .style("font-size", 10)
        .call(yAxis);

      svg
        .selectAll(".bar")
        .data([...data])
        .join("rect")
        .attr("class", "bar")
        .style("transform", "scale(1, -1)")
        .attr("x", ({ label }) => xScale(label))
        .attr("width", xScale.bandwidth())
        .attr("y", -innerHeight)
        .style("cursor", "pointer")
        .style("fill", "#F2DDC1")
        .on("mouseenter", (event, item) => {
          svg
            .selectAll(".tooltip")
            .data([item?.value])
            .join((enter) =>
              enter.append("text").attr("y", yScale(item?.value) - 4)
            )
            .attr("class", "tooltip")
            .text(`${item?.value}`)
            .attr("x", xScale(item?.label) + xScale.bandwidth() / 2)
            .style("font-size", "10px")
            .attr("text-anchor", "middle")
            .transition()
            .duration(500)
            .attr("y", yScale(item?.value) - 8)
            .style("font-size", "14px")
            .style("fill", "#F2DDC1")
            .style("opacity", 1);
        })
        .on("mouseleave", () => svg.select(".tooltip").remove())
        .transition()
        .style("fill", "#F2DDC1")
        .attr("height", ({ value }) => innerHeight - yScale(value));
    }, // eslint-disable-next-line
    [data, dimensions]
  );

  if (!dimensions) {
    return (
      <div
        style={{
          height: 500 - margin.top - margin.bottom,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Spinner />
      </div>
    );
  }

  return (
    <div>
      <svg ref={svgRef} width={`${dimensions?.width}`} height={500}>
        <g className="x-axis" />

        <g className="y-axis" />
      </svg>
    </div>
  );
};
