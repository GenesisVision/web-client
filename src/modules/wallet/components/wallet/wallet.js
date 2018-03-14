import React from "react";
import "./wallet.css";

import WalletChartContainer from "./wallet-chart-container/wallet-chart-container";
import WalletContainer from "./wallet-container/wallet-container";
import WalletTransactionListContainer from "./wallet-transaction-list-container/wallet-transaction-list-container";
import WalletTransactionListFilterContainer from "./wallet-transaction-list-filter-container/wallet-transaction-list-filter-container";

const Wallet = () => (
  <div className="wallet">
    <WalletTransactionListFilterContainer />
    <WalletChartContainer />
    <WalletContainer />
    <WalletTransactionListContainer />
  </div>
);

export default Wallet;
