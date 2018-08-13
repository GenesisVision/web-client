import "./wallet-widget.scss";

import { WalletIcon } from "components/icon/icon";
import Popover from "components/popover/popover";
import { WALLET_ROUTE } from "modules/wallet/wallet.constants";
import React from "react";
import { Link } from "react-router-dom";

class WalletWidget extends React.Component {
  state = {
    anchorEl: null
  };

  handleToggle = e => {
    this.setState({ anchorEl: e.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { availableGvt, totalBalanceGvt, investedGvt } = this.props;
    return (
      <div className={"wallet-widget"} onClick={this.handleToggle}>
        <span className={"wallet-widget__icon"}>
          <WalletIcon />
        </span>
        <span className={"wallet-widget__value"}>{`${availableGvt} GVT`}</span>
        <Popover anchorEl={this.state.anchorEl} onClose={this.handleClose}>
          <div className="ww-details">
            <div className="ww-details__item">
              <div className="ww-details__title">Total balance</div>
              <div className="ww-details__value">{`${totalBalanceGvt} GVT`}</div>
            </div>
            <div className="ww-details__item">
              <div className="ww-details__title">Invested value</div>
              <div className="ww-details__value">{`${investedGvt} GVT`}</div>
            </div>
            <div className="ww-details__item">
              <div className="ww-details__title">Available</div>
              <div className="ww-details__value">{`${availableGvt} GVT`}</div>
            </div>
            <div className="ww-details__item">
              <div className="ww-details__value">
                <Link to={WALLET_ROUTE}>Details</Link>
              </div>
            </div>
          </div>
        </Popover>
      </div>
    );
  }
}

export default WalletWidget;
