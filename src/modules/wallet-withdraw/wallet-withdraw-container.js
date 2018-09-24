import Dialog from "components/dialog/dialog";
import WalletWithdrawPopup from "modules/wallet-withdraw/components/wallet-withdraw-popup";
import PropTypes from "prop-types";
import React, { Component } from "react";

class WalletWithdrawContainer extends Component {
  render() {
    return (
      <Dialog open={this.props.open} onClose={this.props.onClose}>
        <WalletWithdrawPopup />
      </Dialog>
    );
  }
}

WalletWithdrawContainer.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default WalletWithdrawContainer;
