import PropTypes from "prop-types";
import React, { Component } from "react";
import Dialog from "shared/components/dialog/dialog";

import WalletWithdrawContainer from "./components/wallet-withdraw-container";

class WalletWithdrawPopup extends Component {
  render() {
    return (
      <Dialog open={this.props.open} onClose={this.props.onClose}>
        <WalletWithdrawContainer currentWallet={this.props.currentWallet} />
      </Dialog>
    );
  }
}

WalletWithdrawPopup.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default WalletWithdrawPopup;
