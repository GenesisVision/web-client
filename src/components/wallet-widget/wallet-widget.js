import "./wallet-widget.scss";

import { WalletIcon } from "components/icon/icon";
import React from "react";

class WalletWidget extends React.Component {
  render() {
    const { availableGvt } = this.props;
    return (
      <div className={"wallet-widget"}>
        <span className={"wallet-widget__icon"}>
          <WalletIcon />
        </span>
        <span className={"wallet-widget__value"}>{`${availableGvt} GVT`}</span>
        <button className={"wallet-widget__add profile-header__label"}>
          +
        </button>
      </div>
    );
  }
}

export default WalletWidget;
