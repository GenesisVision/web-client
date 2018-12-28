import "./wallet-balance.scss";

import { GVButton } from "gv-react-components";
import React, { Fragment } from "react";
import { translate } from "react-i18next";
import NumberFormat from "react-number-format";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import { formatValue } from "shared/utils/formatter";

import WalletBalanceLoader from "./wallet-balance-loader";

const WalletBalance = ({
  t,
  handleAddFunds,
  handleWithdraw,
  walletBalanceData,
  currentCurrency
}) => {
  const renderWalletBalance = () => (
    <Fragment>
      <div className="wallet-balance__statistic">
        <StatisticItem
          label={t("wallet-page.total-balance")}
          equivalent={walletBalanceData.totalBalanceCurrency}
          equivalentCurrency={currentCurrency}
          large
          accent
        >
          <NumberFormat
            value={formatValue(walletBalanceData.totalBalanceGVT)}
            thousandSeparator={" "}
            displayType="text"
            suffix={" GVT"}
          />
        </StatisticItem>
        <StatisticItem
          label={t("wallet-page.invested-value")}
          equivalent={walletBalanceData.investedCurrency}
          equivalentCurrency={currentCurrency}
          className="wallet-balance__statistic-big"
          big
          accent
        >
          <NumberFormat
            value={formatValue(walletBalanceData.investedGVT)}
            thousandSeparator={" "}
            displayType="text"
            suffix={" GVT"}
          />
        </StatisticItem>
        <StatisticItem
          label={t("wallet-page.available")}
          equivalent={walletBalanceData.availableCurrency}
          equivalentCurrency={currentCurrency}
          className="wallet-balance__statistic-big"
          big
          accent
        >
          <NumberFormat
            value={formatValue(walletBalanceData.availableGVT)}
            thousandSeparator={" "}
            displayType="text"
            suffix={" GVT"}
          />
        </StatisticItem>
      </div>
      <div className="wallet-balance__footer">
        <GVButton
          className="wallet-balance__add-funds"
          onClick={handleAddFunds}
        >
          {t("wallet-page.add-funds")}
        </GVButton>
        <GVButton
          className="wallet-balance__withdraw"
          color="secondary"
          variant="outlined"
          onClick={handleWithdraw}
        >
          {t("wallet-page.withdraw")}
        </GVButton>
      </div>
    </Fragment>
  );
  return (
    <div className="wallet-balance">
      <h1>{t("wallet-page.title")}</h1>
      {!walletBalanceData ? <WalletBalanceLoader /> : renderWalletBalance()}
    </div>
  );
};

export default translate()(WalletBalance);
