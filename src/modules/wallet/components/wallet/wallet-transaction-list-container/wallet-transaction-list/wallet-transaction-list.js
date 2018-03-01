import React from "react";

import WalletTransaction from "../wallet-transaction/wallet-transaction";

const WalletTransactionList = ({ transactions }) => {
  return (
    <div>
      <h2>Transaction History</h2>
      {transactions.map(x => <WalletTransaction key={x.id} transaction={x} />)}
    </div>
  );
};

export default WalletTransactionList;
