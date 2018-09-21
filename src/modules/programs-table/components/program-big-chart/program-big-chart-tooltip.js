import ChartTooltip from "components/chart/chart-tooltip/chart-tooltip";
import React from "react";

const ProgramBigChartTooltip = ({
  active,
  label,
  payload,
  value,
  currency
}) => {
  if (!active) return null;
  return (
    <ChartTooltip
      heading="Equity"
      date={label}
      body={`${payload[0].value} ${currency}`}
    />
  );
};

export default ProgramBigChartTooltip;
