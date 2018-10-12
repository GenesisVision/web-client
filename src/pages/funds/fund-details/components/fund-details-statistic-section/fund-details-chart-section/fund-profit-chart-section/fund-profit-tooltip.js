import ChartTooltip from "components/chart/chart-tooltip/chart-tooltip";
import React, { Fragment } from "react";

const TooltipBody = ({ equity, pnl }) => {
  return (
    <Fragment>
      <div className="fund-details-tooltip__statistic">
        <div className="fund-details-tooltip__title">Equity</div>
        <div className="fund-details-tooltip__value">{equity}</div>
      </div>
      <div className="fund-details-tooltip__statistic">
        <div className="fund-details-tooltip__title">PnL</div>
        <div className="fund-details-tooltip__value">{pnl}</div>
      </div>
    </Fragment>
  );
};
const FundProfitTooltip = ({ active, label, payload, heading, body, date }) => {
  if (!active) return null;
  let equity = "";
  if (payload[1]) {
    equity = `${payload[1].payload.value.toFixed(2)}${payload[1].unit}`;
  }
  let pnl = "";
  if (payload[0]) {
    pnl = `${payload[0].payload.value.toFixed(8)}${payload[0].unit}`;
  }
  return (
    <ChartTooltip
      heading="Profit"
      body={<TooltipBody equity={equity} pnl={pnl} />}
      date={new Date(label)}
      className="fund-details-tooltip"
    />
  );
};
export default FundProfitTooltip;
