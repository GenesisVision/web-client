import React from "react";

import WPInfo from "./wp-info/wp-info";
import WPTransactionList from "./wp-transaction-list/wp-transaction-list";

import "./wallet-pane.css";

const WalletPane = ({ transactions }) => {
  return (
    <div className="wallet-pane">
      <WPInfo />
      <WPTransactionList transactions={transactions} />
    </div>
  );
};

export default WalletPane;
