import ChartTooltip from "components/chart/chart-tooltip/chart-tooltip";
import * as React from "react";

const TooltipBody: React.FC<{ equity: string }> = React.memo(({ equity }) => (
  <div className="details-tooltip__statistic">
    <div className="details-tooltip__value">{equity}</div>
  </div>
));

const ProgramProfitTooltip: React.FC<Props> = ({ active, label, payload }) => {
  if (!active || !payload.length) return null;
  const equity =
    payload[0] && `${payload[0].payload.value.toFixed(2)}${payload[0].unit}`;
  return (
    <ChartTooltip
      body={<TooltipBody equity={equity} />}
      date={new Date(label)}
      className="details-tooltip"
    />
  );
};

interface Props {
  active: boolean;
  label: string;
  payload: any[];
}

export default ProgramProfitTooltip;
