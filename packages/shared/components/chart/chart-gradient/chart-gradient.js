import { GVColors } from "gv-react-components";
import React from "react";

export const getStrokeColor = data => {
  const dataMax = data[data.length - 1];
  const dataMin = data[0];

  return dataMax - dataMin >= 0
    ? GVColors.$positiveColor
    : GVColors.$negativeColor;
};

export const gradientOffset = data => {
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

const ChartGradient = ({ name, offset, color, startOpacity, stopOpacity }) => {
  return (
    <linearGradient id={name} x1="0" y1="0" x2="0" y2="1">
      <stop offset={0} stopColor={color} stopOpacity={startOpacity} />
      <stop offset={offset} stopColor={color} stopOpacity={stopOpacity} />
      <stop offset={offset} stopColor={color} stopOpacity={stopOpacity} />
      <stop offset={1} stopColor={color} stopOpacity={startOpacity} />
    </linearGradient>
  );
};

export default ChartGradient;
