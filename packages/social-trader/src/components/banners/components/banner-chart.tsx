import { select } from "d3";
import { max, min } from "d3-array";
import { scaleLinear } from "d3-scale";
import { area, line } from "d3-shape";
import { SimpleChartPoint } from "gv-api-web";
import { JSDOM } from "jsdom";
import React from "react";
import { $negativeColor, $positiveColor } from "utils/style/colors";

interface Props {
  data: SimpleChartPoint[];
  width: number;
  height: number;
  x: number;
  y: number;
}

const MARGIN_TOP = 1;

const getChartColor = (minValue: number, maxValue: number) => {
  return maxValue - minValue >= 0 ? $positiveColor : $negativeColor;
};

const getGradientColor = (minValue: number, maxValue: number) => {
  return maxValue - minValue >= 0
    ? [
        { offset: "0%", color: "rgba(0,189,175,0.01)" },
        { offset: "100%", color: "rgba(0,189,175,0.3)" }
      ]
    : [
        { offset: "0%", color: "rgba(235,59,90,0.01)" },
        { offset: "100%", color: "rgba(235,59,90,0.3)" }
      ];
};

const lineFunction = line()
  .x(data => data[0])
  .y(data => data[1]);

const BannerChart: React.FC<Props> = ({
  data,
  height,
  width,
  x = 0,
  y = 0
}) => {
  const {
    window: { document }
  } = new JSDOM(`<div class='svg'></div>`);

  const container = document.querySelector(".svg");

  select(container!)
    .append("svg")
    .attr("xmlns", "http://www.w3.org/2000/svg")
    .attr("version", 1.1)
    .attr("width", width)
    .attr("height", height);

  const svg = select(document.querySelector("svg")!);

  const length = data.length;
  if (!length) return null;
  const minValue = min(data, point => point.value) || 0;
  const maxValue = max(data, point => point.value) || 0;

  const firstPoint = data[0];
  const lastPoint = data[length - 1];

  const color = getChartColor(firstPoint.value, lastPoint.value);
  const gradient = getGradientColor(firstPoint.value, lastPoint.value);

  const timeScale = scaleLinear()
    .domain([firstPoint.date, lastPoint.date])
    .range([0, width]);

  const valueScale = scaleLinear()
    .domain([maxValue, minValue])
    .range([MARGIN_TOP, height]);

  const points = data.map(
    point =>
      [timeScale(point.date), valueScale(point.value)] as [number, number]
  );

  const areaFunction = area()
    .x(data => data[0])
    .y(valueScale(minValue))
    .y1(data => data[1]);

  const areaPath = areaFunction(points);
  const linePath = lineFunction(points);

  try {
    svg
      .append("linearGradient")
      .attr("id", "temperature-gradient")
      .attr("gradientUnits", "userSpaceOnUse")
      .attr("x1", 0)
      .attr("y1", valueScale(minValue))
      .attr("x2", 0)
      .attr("y2", valueScale(maxValue))
      .selectAll("stop")
      .data(gradient)
      .enter()
      .append("stop")
      .attr("offset", function(d) {
        return d.offset;
      })
      .attr("stop-color", function(d) {
        return d.color;
      });

    svg
      .append("path")
      .attr("d", linePath!)
      .attr("stroke", color)
      .attr("stroke-width", 2)
      .attr("fill", "none");

    svg
      .append("path")
      .attr("d", areaPath!)
      .attr("stroke", "none")
      .attr("stroke-width", 2)
      .attr("fill", "url(#temperature-gradient)");
  } catch (e) {}

  const __html = document.querySelector("svg")?.innerHTML;
  if (!__html) return null;
  return (
    <svg
      height={height}
      width={width}
      x={x}
      y={y}
      xmlns="http://www.w3.org/2000/svg"
      dangerouslySetInnerHTML={{
        __html
      }}
    />
  );
};

export default BannerChart;
