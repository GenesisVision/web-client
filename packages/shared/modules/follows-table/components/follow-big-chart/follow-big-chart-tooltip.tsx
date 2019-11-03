import React from "react";
import NumberFormat from "react-number-format";
import ChartTooltip from "shared/components/chart/chart-tooltip/chart-tooltip";

const FollowBigChartTooltip: React.FC<Props> = ({ active, label, payload }) =>
  (active && (
    <ChartTooltip
      heading="Equity"
      date={new Date(label)}
      body={
        <NumberFormat
          value={payload[0].value}
          decimalScale={2}
          displayType="text"
          suffix=" %"
        />
      }
    />
  )) ||
  null;

interface Props {
  active: boolean;
  label: string;
  payload: any[];
}

export default FollowBigChartTooltip;
