import { Link } from "react-router-dom";
import React from "react";

import "./wallet-info.css";
import { WALLET_DEPOSIT_ROUTE } from "../../../wallet.constants";
import gvtLogo from "./logo.png";

const WalletInfo = () => {
  return (
    <div className="wallet d-flex flex-column align-items-center m-4">
      <div className="wallet__logo m-1">
        <img src={gvtLogo} alt="Gvt logo" width="100" />
      </div>
      <div className="wallet__amount wallet__amount--gvt">
        1200
        <span className="wallet__currency wallet__currency--gvt">gvt</span>
      </div>
      <div className="wallet__amount wallet__amount--usd">
        $120 000 <span className="wallet__currency">usd</span>
      </div>
      <div className="wallet__operations">
        <Link
          to={WALLET_DEPOSIT_ROUTE}
          className="wallet__button btn btn-primary"
        >
          Deposit
        </Link>
        <button className="wallet__button btn btn-outline-secondary">
          Withdraw
        </button>
      </div>
    </div>
  );
};

export default WalletInfo;
