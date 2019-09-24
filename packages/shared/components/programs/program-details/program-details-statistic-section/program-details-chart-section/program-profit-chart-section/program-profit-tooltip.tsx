import * as React from "react";
import ChartTooltip from "shared/components/chart/chart-tooltip/chart-tooltip";
import { formatValue } from "shared/utils/formatter";

const TooltipBody: React.FC<{ equity: string; pnl: string }> = React.memo(
  ({ equity, pnl }) => (
    <div className="details-tooltip__statistic">
      <div className="details-tooltip__value">
        {pnl} ({equity})
      </div>
    </div>
  )
);

const ProgramProfitTooltip: React.FC<Props> = ({ active, label, payload }) => {
  if (!active || !payload.length) return null;
  let equity = "";
  if (payload[1]) {
    equity = `${payload[1].payload.value.toFixed(2)}${payload[1].unit}`;
  }
  let pnl = "";
  if (payload[0]) {
    pnl = `${formatValue(payload[0].payload.value)}${payload[0].unit}`;
  }
  return (
    <ChartTooltip
      body={<TooltipBody equity={equity} pnl={pnl} />}
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
