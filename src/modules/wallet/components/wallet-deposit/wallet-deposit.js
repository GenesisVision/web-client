import React from "react";

import QRCode from "qrcode.react";

import "./wallet-deposit.css";

const WalletDeposit = () => {
  return (
    <div className="wallet-deposit d-flex flex-column align-items-center">
      <h1 className="m-4">Deposit</h1>
      <div className="m-3">
        <QRCode value="0x000000000000000000000000000000000000000" size={400} />
      </div>
      <h2>Your wallet address</h2>
      <p>0x000000000000000000000000000000000000000</p>
    </div>
  );
};

export default WalletDeposit;
