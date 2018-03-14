import React from "react";

import WalletContainer from "../../../../wallet/components/wallet/wallet-container/wallet-container";
import WPChartContainer from "./wp-chart-container/wp-chart-container";
import WPTransactionListContainer from "./wp-transaction-list-container/wp-transaction-list-container";

import "./wallet-pane.css";

const WalletPane = () => {
  return (
    <div className="wallet-pane">
      <WPChartContainer />
      <WalletContainer />
      <WPTransactionListContainer />
    </div>
  );
};

export default WalletPane;
