import ChartTooltip from "components/chart/chart-tooltip/chart-tooltip";
import styles from "components/details/details-statistic-section/details-chart-section/details-chart-section.module.scss";
import * as React from "react";
import { formatCurrencyValue } from "utils/formatter";

const _TooltipBody: React.FC<ITooltipBodyProps> = ({ value }) => (
  <div className={styles["details-tooltip__statistic"]}>
    <div className={styles["details-tooltip__value"]}>{value}</div>
  </div>
);
const TooltipBody = React.memo(_TooltipBody);

const FollowBalanceTooltip: React.FC<IProgramBalanceTooltipProps> = ({
  active,
  label,
  payload
}) => {
  if (!active || !payload[0]) return null;
  const dot = payload[0];
  const value = `${formatCurrencyValue(dot.payload.value, dot.unit)} ${
    dot.unit
  }`;

  return (
    <ChartTooltip body={<TooltipBody value={value} />} date={new Date(label)} />
  );
};

interface ITooltipBodyProps {
  value: string;
}
interface IProgramBalanceTooltipProps {
  active: boolean;
  label: string;
  payload: any[];
}

export default FollowBalanceTooltip;
