import "../program-simple-chart/program-simple-chart.scss";

import GVColors from "components/gv-styles/gv-colors";
import { select } from "d3";
import { max, min } from "d3-array";
import { axisLeft } from "d3-axis";
import { scaleLinear } from "d3-scale";
import { area, line } from "d3-shape";
import { SimpleChartPoint } from "gv-api-web";
import { JSDOM } from "jsdom";

const MARGIN_LEFT = 20;
const MARGIN_TOP = 1;

const getChartColor = (minValue: number, maxValue: number) => {
  return maxValue - minValue >= 0 ? "#16B9AD" : GVColors.$negativeColor;
};

const getPoints = (min: number, max: number) => {
  const a = min + 30;
  const b = max - 30;
  return [a, (a + b) / 2, b];
};

const lineFunction = line()
  .x(data => data[0])
  .y(data => data[1]);

const BannerChart = ({ data, height, width, x = 0, y = 0 }: Props) => {
  const {
    window: { document }
  } = new JSDOM(`<div class='svg'></div>`);

  const container = document.querySelector(".svg");

  const svg = select(container!)
    .append("svg")
    .attr("xmlns", "http://www.w3.org/2000/svg")
    .attr("width", width)
    .attr("height", height);

  const length = data.length;
  if (!length) return null;
  const minValue = min(data, point => point.value) || 0;
  const maxValue = max(data, point => point.value) || 0;

  const firstPoint = data[0];
  const lastPoint = data[length - 1];

  const color = getChartColor(firstPoint.value, lastPoint.value);

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
      .data([
        { offset: "0%", color: "transparent" },
        { offset: "100%", color: "#00BDAF" }
      ])
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
      .attr("d", areaPath!)
      .attr("stroke", "none")
      .attr("stroke-width", 2)
      .attr("fill", "url(#temperature-gradient)");

    svg
      .append("path")
      .attr("d", linePath!)
      .attr("stroke", "#16B9AD")
      .attr("stroke-width", 2)
      .attr("fill", "none");

    svg
      .append("g")
      .attr("style", "color: rgba(255,255,255,0.2);stroke-dasharray: 1;")
      .attr("transform", `translate(${MARGIN_LEFT}, 0)`)
      .call(
        axisLeft(valueScale)
          .tickValues(getPoints(minValue, maxValue))
          .tickSize(-width + MARGIN_LEFT)
      )
      .select(".domain")
      .remove();
  } catch (e) {}

  return container?.innerHTML;
};

interface Props {
  data: SimpleChartPoint[];
  width: number;
  height: number;
  x: number;
  y: number;
}

export default BannerChart;
