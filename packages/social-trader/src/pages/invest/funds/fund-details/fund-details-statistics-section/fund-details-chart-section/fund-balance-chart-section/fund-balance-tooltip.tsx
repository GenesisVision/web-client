import ChartTooltip from "components/chart/chart-tooltip/chart-tooltip";
import { LabeledValue } from "components/labeled-value/labeled-value";
import { Row } from "components/row/row";
import { Text } from "components/text/text";
import { statisticCurrencySelector } from "pages/invest/funds/fund-details/reducers/statistic-currency.reducer";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { formatCurrencyValue } from "utils/formatter";

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

const _TooltipBody: React.FC<ITooltipBodyProps> = ({
  managersFunds,
  investorsFunds
}) => {
  const [t] = useTranslation();
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
      <Row>
        <LabeledValue
          label={t("asset-details:statistics.tooltip.investors-funds")}
        >
          <Text weight={"bold"}>{formattedInvestorsFunds}</Text>
        </LabeledValue>
      </Row>
      <Row>
        <LabeledValue
          label={t("asset-details:statistics.tooltip.managers-funds")}
        >
          <Text weight={"bold"}>{formattedManagersFunds}</Text>
        </LabeledValue>
      </Row>
    </>
  );
};
const TooltipBody = React.memo(_TooltipBody);

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
    />
  );
};

export default FundBalanceTooltip;
