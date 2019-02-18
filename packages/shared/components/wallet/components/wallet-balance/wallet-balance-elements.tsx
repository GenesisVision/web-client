import "./wallet-balance.scss";

import { GVColors } from "gv-react-components";
import React from "react";
import { translate } from "react-i18next";
import NumberFormat from "react-number-format";
import * as InnerColors from "shared/components/gv-styles/color";
import PieContainer from "shared/components/pie-container/pie-container";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import { formatCurrencyValue } from "shared/utils/formatter";

const getPercentageValue = (value: number, totalValue: number): number => {
  const percentage = Math.round((value / totalValue) * 100);
  return isNaN(percentage) ? 0 : percentage;
};

interface IWalletBalanceElement {
  t(string: string): string;
  total: number;
  available: number;
  invested: number;
  pending: number;
  currency: string;
}

const WalletBalanceElements = (props: IWalletBalanceElement) => {
  const { t } = props;
  return (
    <div className="wallet-balance__wrapper">
      <div className="wallet-balance__statistic-item">
        <StatisticItem label={t("wallet-page.total-balance")} big accent>
          <NumberFormat
            value={formatCurrencyValue(props.total)}
            thousandSeparator={" "}
            displayType="text"
            suffix={` ${props.currency}`}
          />
        </StatisticItem>
      </div>
      <div className="wallet-balance__statistic-item">
        <PieContainer
          value={getPercentageValue(props.available, props.total)}
          color={InnerColors.$pieAvailableColor}
        />
        <StatisticItem
          label={t("wallet-page.available")}
          className="wallet-balance__statistic-big"
          big
          accent
        >
          <NumberFormat
            value={formatCurrencyValue(props.available)}
            thousandSeparator={" "}
            displayType="text"
            suffix={` ${props.currency}`}
          />
        </StatisticItem>
      </div>
      <div className="wallet-balance__statistic-item">
        <PieContainer
          value={getPercentageValue(props.invested, props.total)}
          color={GVColors.$primaryColor}
        />
        <StatisticItem
          label={t("wallet-page.invested-value")}
          className="wallet-balance__statistic-big"
          big
          accent
        >
          <NumberFormat
            value={formatCurrencyValue(props.invested)}
            thousandSeparator={" "}
            displayType="text"
            suffix={` ${props.currency}`}
          />
        </StatisticItem>
      </div>
      <div className="wallet-balance__statistic-item">
        <PieContainer
          value={getPercentageValue(props.pending, props.total)}
          color={InnerColors.$piePendingColor}
        />
        <StatisticItem
          label={t("wallet-page.pending")}
          className="wallet-balance__statistic-big"
          big
          accent
        >
          <NumberFormat
            value={props.pending}
            thousandSeparator={" "}
            displayType="text"
            suffix={` ${props.currency}`}
          />
        </StatisticItem>
      </div>
    </div>
  );
};

export default translate()(WalletBalanceElements);
