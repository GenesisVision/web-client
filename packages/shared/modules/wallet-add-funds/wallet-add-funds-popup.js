import Dialog from "shared/components/dialog/dialog";
import WalletAddFundsContainer from "./components/wallet-add-funds-container";
import PropTypes from "prop-types";
import React, { Component } from "react";

class WalletAddFundsPopup extends Component {
  handleClose = () => {
    this.props.onClose();
  };
  render() {
    return (
      <Dialog open={this.props.open} onClose={this.handleClose}>
        <WalletAddFundsContainer />
      </Dialog>
    );
  }
}

WalletAddFundsPopup.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func.isRequired
};

export default WalletAddFundsPopup;
