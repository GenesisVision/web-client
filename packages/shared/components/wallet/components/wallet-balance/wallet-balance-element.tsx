import "./wallet-balance.scss";

import classNames from "classnames";
import * as React from "react";
import NumberFormat from "react-number-format";
import GVColors from "shared/components/gv-styles/gv-colors";
import PieContainer from "shared/components/pie-container/pie-container";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import { formatCurrencyValue } from "shared/utils/formatter";
import { CurrencyEnum } from "shared/utils/types";

const getPercentageValue = (value: number, totalValue: number): number => {
  const percentage = Math.round((value / totalValue) * 100);
  return isNaN(percentage) ? 0 : percentage;
};

const _WalletBalanceElement: React.FC<Props> = ({
  pieContainer = true,
  value,
  totalValue = value,
  currency,
  title,
  color = GVColors.$primaryColor,
  className
}) => (
  <div className={classNames("wallet-balance__statistic-item", className)}>
    {pieContainer && (
      <PieContainer
        value={getPercentageValue(value, totalValue)}
        color={color}
      />
    )}
    <StatisticItem
      label={title}
      className="wallet-balance__statistic-big"
      big
      accent
    >
      <NumberFormat
        value={formatCurrencyValue(value, currency)}
        thousandSeparator={" "}
        displayType="text"
        suffix={` ${currency}`}
      />
    </StatisticItem>
  </div>
);
const WalletBalanceElement = React.memo(_WalletBalanceElement);

export default WalletBalanceElement;

interface Props {
  currency: CurrencyEnum;
  title: string;
  value: number;
  totalValue?: number;
  color?: string;
  pieContainer?: boolean;
  className?: string;
}
