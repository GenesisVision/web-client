import ChartTooltip from "components/chart/chart-tooltip/chart-tooltip";
import React, { Fragment } from "react";

const TooltipBody = ({ equity, pnl }) => {
  return (
    <Fragment>
      <div className="program-profit-tooltip__statistic">
        <div className="program-profit-tooltip__title">Equity</div>
        <div className="program-profit-tooltip__value">{equity}</div>
      </div>
      <div>
        <div className="program-profit-tooltip__title">PnL</div>
        <div className="program-profit-tooltip__value">{pnl}</div>
      </div>
    </Fragment>
  );
};
const ProgramProfitTooltip = ({
  active,
  label,
  payload,
  heading,
  body,
  date
}) => {
  if (!active) return null;
  let equity = "";
  if (payload[0]) {
    equity = `${payload[0].payload.value.toFixed(2)}${payload[0].unit}`;
  }
  let pnl = "";
  if (payload[1]) {
    pnl = `${payload[1].payload.value.toFixed(8)}${payload[1].unit}`;
  }
  return (
    <ChartTooltip
      heading="Profit"
      body={<TooltipBody equity={equity} pnl={pnl} />}
      date={new Date(label)}
      className="program-profit-tooltip"
    />
  );
};
export default ProgramProfitTooltip;
