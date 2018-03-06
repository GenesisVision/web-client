import React from "react";

import WalletContainer from "./wallet-container/wallet-container";
import WalletTransactionFiltrableList from "./wallet-transaction-filterable-list/wallet-transaction-filterable-list";

const Wallet = () => (
  <div>
    <h1>Wallet</h1>
    <WalletContainer />
    <WalletTransactionFiltrableList />
  </div>
);

export default Wallet;
