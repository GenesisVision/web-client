import { CopyTradingAccountInfo } from "gv-api-web";
import React, { FunctionComponent } from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import NumberFormat from "react-number-format";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import { formatCurrencyValue } from "shared/utils/formatter";

interface IWalletCopytradingBalanceProps {
  wallet: CopyTradingAccountInfo;
}

const WalletCopytradingBalance: FunctionComponent<
  IWalletCopytradingBalanceProps & InjectedTranslateProps
> = ({ t, wallet }) => {
  return (
    <div className="wallet-balance__wrapper">
      <div className="wallet-balance__statistic-item">
        <StatisticItem label={t("wallet-copytrading-page.balance")} big accent>
          <NumberFormat
            value={formatCurrencyValue(wallet.balance, wallet.currency)}
            thousandSeparator={" "}
            displayType="text"
            suffix={` ${wallet.currency}`}
          />
        </StatisticItem>
      </div>
      <div className="wallet-balance__statistic-item">
        <StatisticItem
          label={t("wallet-copytrading-page.equity")}
          className="wallet-balance__statistic-big"
          big
          accent
        >
          <NumberFormat
            value={formatCurrencyValue(wallet.equity, wallet.currency)}
            thousandSeparator={" "}
            displayType="text"
            suffix={` ${wallet.currency}`}
          />
        </StatisticItem>
      </div>
      <div className="wallet-balance__statistic-item">
        <StatisticItem
          label={t("wallet-copytrading-page.profit")}
          className="wallet-balance__statistic-big"
          big
          accent
        >
          {/* <NumberFormat
            value={formatCurrencyValue(wallet.freeMargin, wallet.currency)}
            thousandSeparator={" "}
            displayType="text"
            suffix={` ${wallet.currency}`}
          /> */}
          ??
        </StatisticItem>
      </div>
    </div>
  );
};

export default translate()(WalletCopytradingBalance);
