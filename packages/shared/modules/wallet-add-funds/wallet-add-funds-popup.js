import PropTypes from "prop-types";
import React, { Component } from "react";
import Dialog from "shared/components/dialog/dialog";

import WalletAddFundsContainer from "./components/wallet-add-funds-container";

class WalletAddFundsPopup extends Component {
  handleClose = () => {
    this.props.onClose();
  };
  render() {
    return (
      <Dialog open={this.props.open} onClose={this.handleClose}>
        <WalletAddFundsContainer currentWallet={this.props.currentWallet} />
      </Dialog>
    );
  }
}

WalletAddFundsPopup.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func.isRequired
};

export default WalletAddFundsPopup;
