import React from "react";
import WalletButtons from "./wallet-buttons/wallet-buttons";

import "./wallet-info.css";

const WalletInfo = ({ wallet }) => {
  return (
    <div className="wallet-info">
      <div className="wallet-info__amount">
        {+wallet.amount.toFixed(2)}
        <span className="wallet-info__currency">{wallet.currency}</span>
      </div>
      <WalletButtons />
    </div>
  );
};

export default WalletInfo;
