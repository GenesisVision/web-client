import React from "react";

import WalletContainer from "./wallet-container/wallet-container";
import WalletTransactionListContainer from "./wallet-transaction-list-container/wallet-transaction-list-container";

const Wallet = () => (
  <div>
    <h1>Wallet</h1>
    <WalletContainer />
    <WalletTransactionListContainer />
  </div>
);

export default Wallet;
