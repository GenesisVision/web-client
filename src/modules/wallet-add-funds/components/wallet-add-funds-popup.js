import WalletAddFundsBottom from "modules/wallet-add-funds/components/wallet-add-funds-bottom";
import WalletAddFundsTop from "modules/wallet-add-funds/components/wallet-add-funds-top";
import PropTypes from "prop-types";
import React, { Component, Fragment } from "react";

class WalletAddFundsPopup extends Component {
  render() {
    return (
      <Fragment>
        <WalletAddFundsTop />
        <WalletAddFundsBottom />
      </Fragment>
    );
  }
}

WalletAddFundsPopup.propTypes = {};

export default WalletAddFundsPopup;
