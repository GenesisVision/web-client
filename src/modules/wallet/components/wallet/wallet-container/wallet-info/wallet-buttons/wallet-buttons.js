import React from "react";

import "./wallet-buttons.css";

const WalletButtons = () => {
  return (
    <div className="wallet-buttons">
      <button className="gv-btn gv-btn-primary" disabled>
        Deposit
      </button>
      <button className="gv-btn gv-btn-secondary" disabled>
        Withdraw
      </button>
    </div>
  );
};

export default WalletButtons;
