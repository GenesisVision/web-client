import ChartTooltip from "components/chart/chart-tooltip/chart-tooltip";
import {
  DetailsChartTooltipStatistic,
  DetailsChartTooltipValue
} from "components/details/details-statistic-section/details-chart-section/details-chart-tooltip";
import * as React from "react";
import { formatCurrencyValue } from "utils/formatter";

const _TooltipBody: React.FC<ITooltipBodyProps> = ({ value }) => (
  <DetailsChartTooltipStatistic>
    <DetailsChartTooltipValue>{value}</DetailsChartTooltipValue>
  </DetailsChartTooltipStatistic>
);
const TooltipBody = React.memo(_TooltipBody);

const FollowBalanceTooltip: React.FC<IProgramBalanceTooltipProps> = ({
  active,
  label,
  payload
}) => {
  if (!active || !payload[0]) return null;
  const dot = payload[0];
  const value = `${formatCurrencyValue(dot.payload.value, dot.unit)} ${
    dot.unit
  }`;

  return (
    <ChartTooltip body={<TooltipBody value={value} />} date={new Date(label)} />
  );
};

interface ITooltipBodyProps {
  value: string;
}
interface IProgramBalanceTooltipProps {
  active: boolean;
  label: string;
  payload: any[];
}

export default FollowBalanceTooltip;
