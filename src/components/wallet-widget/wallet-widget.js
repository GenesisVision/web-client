import "./wallet-widget.scss";

import { WalletIcon } from "components/icon/icon";
import React from "react";

const WalletWidget = ({ availableGvt = 23.343434 }) => {
  return (
    <div className={"wallet-widget"}>
      <span className={"wallet-widget__icon"}>
        <WalletIcon />
      </span>
      <span className={"wallet-widget__value"}>{`${availableGvt} GVT`}</span>
    </div>
  );
};

export default WalletWidget;
