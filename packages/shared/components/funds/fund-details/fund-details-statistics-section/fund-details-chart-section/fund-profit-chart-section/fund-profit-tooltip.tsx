import * as React from "react";
import NumberFormat from "react-number-format";
import ChartTooltip from "shared/components/chart/chart-tooltip/chart-tooltip";

const FundProfitTooltip: React.FC<Props> = ({ active, label, payload }) => {
  if (!active) return null;
  return (
    <ChartTooltip
      heading="Profit"
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
  );
};

interface Props {
  active: boolean;
  label: string;
  payload: any[];
}

export default FundProfitTooltip;
