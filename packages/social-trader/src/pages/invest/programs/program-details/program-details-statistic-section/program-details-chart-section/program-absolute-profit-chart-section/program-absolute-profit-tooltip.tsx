import ChartTooltip from "components/chart/chart-tooltip/chart-tooltip";
import {
  DetailsChartTooltipStatistic,
  DetailsChartTooltipValue
} from "components/details/details-statistic-section/details-chart-section/details-chart-tooltip";
import * as React from "react";

const TooltipBody: React.FC<{ equity: string }> = React.memo(({ equity }) => (
  <DetailsChartTooltipStatistic>
    <DetailsChartTooltipValue>{equity}</DetailsChartTooltipValue>
  </DetailsChartTooltipStatistic>
));

const ProgramAbsoluteProfitTooltip: React.FC<Props> = ({
  active,
  label,
  payload
}) => {
  if (!active || !payload.length) return null;
  const equity =
    payload[0] && `${payload[0].payload.value.toFixed(2)} ${payload[0].unit}`;
  return (
    <ChartTooltip
      body={<TooltipBody equity={equity} />}
      date={new Date(label)}
    />
  );
};

interface Props {
  active: boolean;
  label: string;
  payload: any[];
}

export default ProgramAbsoluteProfitTooltip;
