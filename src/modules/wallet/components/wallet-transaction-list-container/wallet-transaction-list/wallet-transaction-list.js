import React from "react";

import WalletTransaction from "../wallet-transaction/wallet-transaction";

const WalletTransactionList = ({ transactions }) => {
  return transactions.map(x => <WalletTransaction key={x.id} transaction={x} />);
};

export default WalletTransactionList;
