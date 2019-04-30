import * as React from "react";
import { InjectedTranslateProps } from "react-i18next";
import translate from "react-i18next/src/translate";
import ChartTooltip from "shared/components/chart/chart-tooltip/chart-tooltip";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import { formatCurrencyValue } from "shared/utils/formatter";

const _TooltipBody: React.FC<ITooltipBodyProps & InjectedTranslateProps> = ({
  t,
  managersFunds,
  investorsFunds,
  profit
}) => (
  <>
    <StatisticItem
      label={t("program-details-page.statistics.tooltip.profit")}
      accent
    >
      {profit}
    </StatisticItem>
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
const TooltipBody = React.memo(translate()(_TooltipBody));

const ProgramBalanceTooltip: React.FC<IProgramBalanceTooltipProps> = ({
  active,
  label,
  payload
}) => {
  if (!active || !payload[0]) return null;
  const dot = payload[0];
  const managersFunds = `${formatCurrencyValue(
    dot.payload.managerFunds,
    dot.unit
  )} ${dot.unit}`;
  const investorsFunds = `${formatCurrencyValue(
    dot.payload.investorsFunds,
    dot.unit
  )} ${dot.unit}`;

  const profit = `${formatCurrencyValue(
    dot.payload.profit || dot.payload.profitNegative,
    dot.unit
  )} ${dot.unit}`;

  return (
    <ChartTooltip
      heading="Equity"
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
interface IProgramBalanceTooltipProps {
  active: boolean;
  label: string;
  payload: any[];
}

export default ProgramBalanceTooltip;
