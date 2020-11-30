import { max, min } from "d3-array";
import { scaleLinear } from "d3-scale";
import { line } from "d3-shape";
import { SimpleChartPoint } from "gv-api-web";
import * as React from "react";
import { $negativeColor, $positiveColor } from "utils/style/colors";

interface Props {
  data: SimpleChartPoint[];
  width?: number;
  height?: number;
  x?: number;
  y?: number;
}

const DEFAULT_WIDTH = 100;
const DEFAULT_HEIGHT = 50;
const OFFSET = 0;

const lineFunction = line()
  .x(data => data[0])
  .y(data => data[1]);

const getChartColor = (minValue: number, maxValue: number) => {
  return maxValue - minValue >= 0 ? $positiveColor : $negativeColor;
};

const _SimpleChart: React.FC<Props> = ({
  data,
  height = DEFAULT_HEIGHT,
  width = DEFAULT_WIDTH,
  x = 0,
  y = 0
}) => {
  const length = data.length;
  if (!length) return null;
  const minValue = min(data, point => point.value) || 0;
  const maxValue = max(data, point => point.value) || 0;

  const firstPoint = data[0];
  const lastPoint = data[length - 1];

  const color = getChartColor(firstPoint.value, lastPoint.value);

  const timeScale = scaleLinear()
    .domain([firstPoint.date, lastPoint.date])
    .range([OFFSET, width - OFFSET]);

  const valueScale = scaleLinear()
    .domain([maxValue, minValue])
    .range([OFFSET, height - OFFSET]);

  const points = data.map(
    point =>
      [timeScale(point.date), valueScale(point.value)] as [number, number]
  );

  const path = lineFunction(points);

  if (!path) return null;
  return (
    <svg width={width} height={height} x={x} y={y}>
      <path d={path} stroke={color} strokeWidth={2} fill="none" />
    </svg>
  );
};

const SimpleChart = React.memo(_SimpleChart);
export default SimpleChart;
