import React from "react";

import "./wallet-buttons.css";

const WalletButtons = () => {
  return (
    <div className="wallet-buttons">
      <button className="btn btn-primary" disabled>
        Deposit
      </button>
      <button className="btn btn-outline-secondary" disabled>
        Withdraw
      </button>
    </div>
  );
};

export default WalletButtons;
