import "./wallet-balance.scss";

import classNames from "classnames";
import * as React from "react";
import NumberFormat from "react-number-format";
import GVColors from "shared/components/gv-styles/gv-colors";
import PieContainer from "shared/components/pie-container/pie-container";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import { TooltipLabel } from "shared/components/tooltip-label/tooltip-label";
import withLoader from "shared/decorators/with-loader";
import { formatCurrencyValue } from "shared/utils/formatter";
import { getPercentageValue } from "shared/utils/helpers";
import { CurrencyEnum } from "shared/utils/types";

const _WalletBalanceElement: React.FC<Props> = ({
  pieContainer = true,
  value,
  totalValue = value,
  currency,
  title,
  color = GVColors.$primaryColor,
  className,
  tooltipContentLabel
}) => (
  <div className={classNames("wallet-balance__statistic-item", className)}>
    {pieContainer && (
      <PieContainer
        value={getPercentageValue(value, totalValue)}
        label={`${getPercentageValue(value, totalValue)} %`}
        color={color}
      />
    )}
    <StatisticItem
      label={
        <TooltipLabel tooltipContent={tooltipContentLabel} labelText={title} />
      }
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
const WalletBalanceElement = withLoader(React.memo(_WalletBalanceElement));

export default WalletBalanceElement;

interface Props {
  currency: CurrencyEnum;
  title: string;
  value: number;
  totalValue?: number;
  color?: string;
  pieContainer?: boolean;
  className?: string;
  tooltipContentLabel: string;
}
