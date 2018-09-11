import React from "react";

export const gradientOffset = data => {
  const dataMax = Math.max(...data);
  const dataMin = Math.min(...data);

  if (dataMax <= 0) {
    return 0;
  } else if (dataMin >= 0) {
    return 1;
  } else {
    return dataMax / (dataMax - dataMin);
  }
};

const ProgramChartGradient = ({
  name,
  offset,
  negativeColor,
  positiveColor,
  startOpacity,
  stopOpacity
}) => {
  return (
    <linearGradient id={name} x1="0" y1="0" x2="0" y2="1">
      <stop offset={0} stopColor={positiveColor} stopOpacity={startOpacity} />
      <stop
        offset={offset}
        stopColor={positiveColor}
        stopOpacity={stopOpacity}
      />
      <stop
        offset={offset}
        stopColor={negativeColor}
        stopOpacity={stopOpacity}
      />
      <stop offset={1} stopColor={negativeColor} stopOpacity={startOpacity} />
    </linearGradient>
  );
};

export default ProgramChartGradient;
