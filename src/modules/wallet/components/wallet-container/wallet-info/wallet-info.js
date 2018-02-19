import React from "react";

import "./wallet-info.css";
import gvtLogo from "./logo.png";

const WalletInfo = () => {
  return (
    <div className="wallet d-flex flex-column align-items-center">
      <div className="wallet__logo mt-4 m-1">
        <img src={gvtLogo} alt="Gvt logo" width="100" />
      </div>
      <div className="wallet__amount wallet__amount--gvt">123 gvt</div>
      <div className="wallet__amount wallet__amount--usd">$123 000 usd</div>
      <div className="wallet__operations">
        <button className="btn btn-primary m-2">Deposit</button>
        <button className="btn btn-secondary m-2">Withdraw</button>
      </div>
    </div>
  );
};

export default WalletInfo;
