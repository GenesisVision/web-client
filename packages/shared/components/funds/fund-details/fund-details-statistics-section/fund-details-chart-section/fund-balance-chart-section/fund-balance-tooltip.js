import React, { Fragment } from "react";
import ChartTooltip from "shared/components/chart/chart-tooltip/chart-tooltip";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import { formatValue } from "shared/utils/formatter";

const TooltipBody = ({ managersFunds, investorsFunds, profit }) => {
  return (
    <Fragment>
      <StatisticItem label={"Investors Funds"} accent>
        {investorsFunds}
      </StatisticItem>
      <StatisticItem label={"Managers Funds"} accent>
        {managersFunds}
      </StatisticItem>
    </Fragment>
  );
};
const FundBalanceTooltip = ({
  active,
  label,
  payload,
  heading,
  body,
  date
}) => {
  if (!active || !payload[0]) return null;

  const managersFunds = `${formatValue(payload[0].payload.managerFunds)} GVT`;
  const investorsFunds = `${formatValue(
    payload[0].payload.investorsFunds
  )} GVT`;
  const profit = `${payload[0].payload.profit} ${payload[0].unit}`;

  return (
    <ChartTooltip
      heading="Balance"
      body={
        <TooltipBody
          managersFunds={managersFunds}
          investorsFunds={investorsFunds}
          profit={profit}
        />
      }
      date={new Date(label)}
      className="details-tooltip"
    />
  );
};
export default FundBalanceTooltip;
