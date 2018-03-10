import React from "react";

import WalletTransactionFilterContainer from "./wallet-transaction-filter-container/wallet-transaction-filter-container";
import WalletTransactionListContainer from "./wallet-transaction-list-container/wallet-transaction-list-container";

const WalletTransactionFilterableList = ({ queryParams }) => (
  <div>
    <WalletTransactionFilterContainer queryParams={queryParams} />
    <WalletTransactionListContainer queryParams={queryParams} />
  </div>
);

export default WalletTransactionFilterableList;
