import React from "react";

import WalletHistory from "./wallet-history/wallet-history";
import WalletInfo from "./wallet-info/wallet-info";

const WalletContainer = () => {
  return (
    <div>
      <h1>Wallet</h1>
      <WalletInfo />
      <WalletHistory />
    </div>
  );
};

export default WalletContainer;
