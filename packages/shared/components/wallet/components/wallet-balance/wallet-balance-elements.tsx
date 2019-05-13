import "./wallet-balance.scss";

import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import NumberFormat from "react-number-format";
import GVColors from "shared/components/gv-styles/gv-colors";
import PieContainer from "shared/components/pie-container/pie-container";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import { formatCurrencyValue } from "shared/utils/formatter";
import { CurrencyEnum } from "shared/utils/types";

export const $piePendingColor = "#f7931a";
export const $pieAvailableColor = "#5758a5";

const getPercentageValue = (value: number, totalValue: number): number => {
  const percentage = Math.round((value / totalValue) * 100);
  return isNaN(percentage) ? 0 : percentage;
};

const _WalletBalanceElements: React.FC<IWalletBalanceElementsProps> = ({
  t,
  pending,
  total,
  currency,
  available,
  invested
}) => (
  <div className="wallet-balance__wrapper">
    <WalletBalanceElement
      value={total}
      title={t("wallet-page.total-balance")}
      currency={currency}
      pieContainer={false}
    />
    <WalletBalanceElement
      value={available}
      totalValue={total}
      title={t("wallet-page.available")}
      currency={currency}
      color={$pieAvailableColor}
    />
    <WalletBalanceElement
      value={invested}
      totalValue={total}
      title={t("wallet-page.invested-value")}
      currency={currency}
      color={GVColors.$primaryColor}
    />
    <WalletBalanceElement
      value={pending}
      totalValue={total}
      title={t("wallet-page.pending")}
      currency={currency}
      color={$piePendingColor}
    />
  </div>
);

const _WalletBalanceElement: React.FC<IWalletBalanceElementProps> = ({
  pieContainer = true,
  value,
  totalValue = value,
  currency,
  title,
  color = GVColors.$primaryColor
}) => (
  <div className="wallet-balance__statistic-item">
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

interface IWalletBalanceElementProps {
  currency: CurrencyEnum;
  title: string;
  value: number;
  totalValue?: number;
  color?: string;
  pieContainer?: boolean;
}

interface IWalletBalanceElementsProps extends InjectedTranslateProps {
  total: number;
  available: number;
  invested: number;
  pending: number;
  currency: CurrencyEnum;
}

const WalletBalanceElements = React.memo(translate()(_WalletBalanceElements));
export default WalletBalanceElements;
