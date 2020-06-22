import ChartTooltip from "components/chart/chart-tooltip/chart-tooltip";
import styles from "components/details/details-statistic-section/details-chart-section/details-chart-section.module.scss";
import StatisticItem from "components/statistic-item/statistic-item";
import { statisticCurrencySelector } from "pages/invest/funds/fund-details/reducers/statistic-currency.reducer";
import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { useSelector } from "react-redux";
import { formatCurrencyValue } from "utils/formatter";

const _TooltipBody: React.FC<ITooltipBodyProps & WithTranslation> = ({
  t,
  managersFunds,
  investorsFunds
}) => {
  const statisticCurrency = useSelector(statisticCurrencySelector);
  const formattedManagersFunds = `${formatCurrencyValue(
    managersFunds,
    statisticCurrency
  )} ${statisticCurrency}`;
  const formattedInvestorsFunds = `${formatCurrencyValue(
    investorsFunds,
    statisticCurrency
  )} ${statisticCurrency}`;
  return (
    <>
      <StatisticItem
        label={t("asset-details:statistics.tooltip.investors-funds")}
        accent
      >
        {formattedInvestorsFunds}
      </StatisticItem>
      <StatisticItem
        label={t("asset-details:statistics.tooltip.managers-funds")}
        accent
      >
        {formattedManagersFunds}
      </StatisticItem>
    </>
  );
};
const TooltipBody = translate()(React.memo(_TooltipBody));

const FundBalanceTooltip: React.FC<IFundBalanceTooltipProps> = ({
  active,
  label,
  payload
}) => {
  if (!active || !payload[0]) return null;
  const profit = `${payload[0].payload.profit} ${payload[0].unit}`;
  return (
    <ChartTooltip
      heading="Balance"
      body={
        <TooltipBody
          managersFunds={payload[0].payload.managerFunds}
          investorsFunds={payload[0].payload.investorsFunds}
          profit={profit}
        />
      }
      date={new Date(label)}
      className={styles["details-tooltip"]}
    />
  );
};

interface ITooltipBodyProps {
  managersFunds: number;
  investorsFunds: number;
  profit: string;
}
interface IFundBalanceTooltipProps {
  active: boolean;
  label: string;
  payload: any[];
}

export default FundBalanceTooltip;
