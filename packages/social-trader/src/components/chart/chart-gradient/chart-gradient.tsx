import GVColors from "components/gv-styles/gv-colors";
import * as React from "react";

export const getStrokeColor = (data: number[]): string => {
  const dataMax = data[data.length - 1];
  const dataMin = data[0];

  return getChartColor(dataMin, dataMax);
};

export const getChartColor = (minValue: number, maxValue: number) => {
  return maxValue - minValue >= 0
    ? GVColors.$positiveColor
    : GVColors.$negativeColor;
};

export const gradientOffset = (data: number[]): number => {
  const dataMax = Math.max(...data);
  const dataMin = Math.min(...data);

  if (dataMax <= 0) {
    return 0;
  } else if (dataMin >= 0) {
    return 1;
  } else {
    return 0;
  }
};

const _ChartGradient: React.FC<Props> = ({
  name,
  offset,
  color,
  startOpacity,
  stopOpacity
}) => (
  <linearGradient id={name} x1="0" y1="0" x2="0" y2="1">
    <stop offset={0} stopColor={color} stopOpacity={startOpacity} />
    <stop offset={offset} stopColor={color} stopOpacity={stopOpacity} />
    <stop offset={offset} stopColor={color} stopOpacity={stopOpacity} />
    <stop offset={1} stopColor={color} stopOpacity={startOpacity} />
  </linearGradient>
);

interface Props {
  name: string;
  offset: number;
  color: string;
  startOpacity: number;
  stopOpacity: number;
}

export const ChartGradient = React.memo(_ChartGradient);
