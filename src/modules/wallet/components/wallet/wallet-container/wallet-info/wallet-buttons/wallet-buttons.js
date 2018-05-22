import React from "react";
import Button from "../../../../../../../components/button/button";
import "./wallet-buttons.css";

const WalletButtons = () => {
  return (
    <div className="wallet-buttons">
      <Button primary disabled label="Deposit" />
      <Button secondary disabled label="Withdraw" />
    </div>
  );
};

export default WalletButtons;
