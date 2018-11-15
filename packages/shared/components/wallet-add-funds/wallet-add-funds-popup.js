import PropTypes from "prop-types";
import React, { Component } from "react";
import Dialog from "shared/components/dialog/dialog";
import WalletAddFundsPopup from "shared/components/wallet-add-funds/components/wallet-add-funds-container";

class WalletAddFundsContainer extends Component {
  handleClose = () => {
    this.props.onClose();
  };
  render() {
    return (
      <Dialog open={this.props.open} onClose={this.handleClose}>
        <WalletAddFundsPopup />
      </Dialog>
    );
  }
}

WalletAddFundsContainer.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func.isRequired
};

export default WalletAddFundsContainer;
