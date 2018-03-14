import React from "react";

import "./wallet-transaction-list.css";

import WalletTransaction from "./wallet-transaction/wallet-transaction";

const WalletTransactionList = ({ transactions }) => {
  return (
    <div className="wallet-transaction-list">
      {transactions.map(x => <WalletTransaction key={x.id} transaction={x} />)}
    </div>
  );
};

export default WalletTransactionList;
