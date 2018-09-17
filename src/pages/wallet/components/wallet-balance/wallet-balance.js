import "./wallet-balance.scss";

import StatisticItem from "components/statistic-item/statistic-item";
import { GVButton } from "gv-react-components";
import React from "react";
import { translate } from "react-i18next";

const WalletBalance = ({
  t,
  handleAddFunds,
  handleWithdraw,
  walletBalanceData,
  currentCurrency
}) => (
  <div className="wallet-balance">
    <h1 className="wallet-balance__heading">{t("wallet.title")}</h1>
    <div className="wallet-balance__statistic">
      <StatisticItem
        heading={t("wallet.total-balance")}
        value={walletBalanceData.totalBalanceGVT}
        equivalent={walletBalanceData.totalBalanceCurrency}
        currency={currentCurrency}
        valueClassName="wallet-balance__total-balance-value"
      />
      <StatisticItem
        heading={t("wallet.invested-value")}
        value={walletBalanceData.investedGVT}
        equivalent={walletBalanceData.investedCurrency}
        currency={currentCurrency}
        valueClassName="wallet-balance__statistic-item-value"
      />
      <StatisticItem
        heading={t("wallet.available")}
        value={walletBalanceData.availableGVT}
        equivalent={walletBalanceData.availableCurrency}
        currency={currentCurrency}
        valueClassName="wallet-balance__statistic-item-value"
      />
    </div>
    <div className="wallet-balance__footer">
      <GVButton className="wallet-balance__add-funds" onClick={handleAddFunds}>
        {t("wallet.add-funds")}
      </GVButton>
      <GVButton
        className="wallet-balance__withdraw"
        color="secondary"
        variant="outlined"
        onClick={handleWithdraw}
      >
        {t("wallet.withdraw")}
      </GVButton>
    </div>
  </div>
);

export default translate()(WalletBalance);
