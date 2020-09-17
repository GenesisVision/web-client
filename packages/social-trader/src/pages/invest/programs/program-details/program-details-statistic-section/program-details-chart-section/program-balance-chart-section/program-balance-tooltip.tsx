import ChartTooltip from "components/chart/chart-tooltip/chart-tooltip";
import { LabeledValue } from "components/labeled-value/labeled-value";
import { Row } from "components/row/row";
import { Text } from "components/text/text";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { formatCurrencyValue } from "utils/formatter";

const _TooltipBody: React.FC<ITooltipBodyProps> = ({
  managersFunds,
  investorsFunds
}) => {
  const [t] = useTranslation();
  return (
    <>
      <Row>
        <LabeledValue
          label={t("asset-details:statistics.tooltip.investors-funds")}
        >
          <Text weight={"bold"}>{investorsFunds}</Text>
        </LabeledValue>
      </Row>
      <Row>
        <LabeledValue
          label={t("asset-details:statistics.tooltip.managers-funds")}
        >
          <Text weight={"bold"}>{managersFunds}</Text>
        </LabeledValue>
      </Row>
    </>
  );
};
const TooltipBody = React.memo(_TooltipBody);

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

  return (
    <ChartTooltip
      heading="Equity"
      body={
        <TooltipBody
          managersFunds={managersFunds}
          investorsFunds={investorsFunds}
        />
      }
      date={new Date(label)}
    />
  );
};

interface ITooltipBodyProps {
  managersFunds: string;
  investorsFunds: string;
}
interface IProgramBalanceTooltipProps {
  active: boolean;
  label: string;
  payload: any[];
}

export default ProgramBalanceTooltip;
