import * as React from "react";
import { InjectedTranslateProps } from "react-i18next";
import translate from "react-i18next/src/translate";
import ChartTooltip from "shared/components/chart/chart-tooltip/chart-tooltip";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import { formatCurrencyValue } from "shared/utils/formatter";

const _TooltipBody: React.FC<ITooltipBodyProps & InjectedTranslateProps> = ({
  t,
  managersFunds,
  investorsFunds
}) => (
  <>
    <StatisticItem
      label={t("program-details-page.statistics.tooltip.investors-funds")}
      accent
    >
      {investorsFunds}
    </StatisticItem>
    <StatisticItem
      label={t("program-details-page.statistics.tooltip.managers-funds")}
      accent
    >
      {managersFunds}
    </StatisticItem>
  </>
);
const TooltipBody = translate()(React.memo(_TooltipBody));

const FundBalanceTooltip: React.FC<IFundBalanceTooltipProps> = ({
  active,
  label,
  payload
}) => {
  if (!active || !payload[0]) return null;

  const managersFunds = `${formatCurrencyValue(
    payload[0].payload.managerFunds,
    "GVT"
  )} GVT`;
  const investorsFunds = `${formatCurrencyValue(
    payload[0].payload.investorsFunds,
    "GVT"
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

interface ITooltipBodyProps {
  managersFunds: string;
  investorsFunds: string;
  profit: string;
}
interface IFundBalanceTooltipProps {
  active: boolean;
  label: string;
  payload: any[];
}

export default FundBalanceTooltip;
