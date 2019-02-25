import PropTypes from "prop-types";
import React, { Component } from "react";
import Dialog from "shared/components/dialog/dialog";

import WalletTransferContainer from "./components/wallet-transfer-container";

class WalletTransferPopup extends Component {
  render() {
    return (
      <Dialog open={this.props.open} onClose={this.props.onClose}>
        <WalletTransferContainer
          currentWallet={this.props.currentWallet}
          onClose={this.props.onClose}
        />
      </Dialog>
    );
  }
}

WalletTransferPopup.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default WalletTransferPopup;
