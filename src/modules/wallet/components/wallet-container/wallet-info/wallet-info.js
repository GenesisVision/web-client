import { Link } from "react-router-dom";
import React from "react";

import "./wallet-info.css";

import {
  WALLET_DEPOSIT_ROUTE,
  WALLET_WITHDRAW_ROUTE
} from "../../../wallet.constants";
import gvtLogo from "./logo.png";

const WalletInfo = ({ balance }) => {
  return (
    <div className="wallet d-flex flex-column align-items-center m-4">
      <div className="wallet__logo m-1">
        <img src={gvtLogo} alt="Gvt logo" width="100" />
      </div>
      <div className="wallet__amount wallet__amount--gvt">
        {balance.amount}
        <span className="wallet__currency wallet__currency--gvt">gvt</span>
      </div>
      <div className="wallet__amount wallet__amount--usd">
        ${balance.amount * balance.rate}
        <span className="wallet__currency"> usd</span>
      </div>
      <div className="wallet__operations">
        <Link
          to={WALLET_DEPOSIT_ROUTE}
          className="wallet__button btn btn-primary"
        >
          Deposit
        </Link>
        <Link
          to={WALLET_WITHDRAW_ROUTE}
          className="wallet__button btn btn-outline-secondary"
        >
          Withdraw
        </Link>
      </div>
    </div>
  );
};

export default WalletInfo;
