import "./wallet-balance.scss";

import React from "react";
import { translate } from "react-i18next";

import WalletBalanceList from "./wallet-balance-list";
import WalletBalanceLoader from "./wallet-balance-loader";

const WalletBalance = ({
  t,
  handleAddFunds,
  handleWithdraw,
  walletBalanceData,
  currentCurrency
}) => {
  return (
    <div className="wallet-balance">
      <h1>{t("wallet-page.title")}</h1>
      {!walletBalanceData ? (
        <WalletBalanceLoader />
      ) : (
        <WalletBalanceList
          walletBalanceData={walletBalanceData}
          currentCurrency={currentCurrency}
          handleAddFunds={handleAddFunds}
          handleWithdraw={handleWithdraw}
        />
      )}
    </div>
  );
};

export default translate()(WalletBalance);
