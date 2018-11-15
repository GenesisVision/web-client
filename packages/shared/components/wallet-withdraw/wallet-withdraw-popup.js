import WalletWithdrawContainer from "modules/wallet-withdraw/components/wallet-withdraw-container";
import PropTypes from "prop-types";
import React, { Component } from "react";
import Dialog from "shared/components/dialog/dialog";

class WalletWithdrawPopup extends Component {
  render() {
    return (
      <Dialog open={this.props.open} onClose={this.props.onClose}>
        <WalletWithdrawContainer />
      </Dialog>
    );
  }
}

WalletWithdrawPopup.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default WalletWithdrawPopup;
