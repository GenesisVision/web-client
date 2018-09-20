import Dialog from "components/dialog/dialog";
import WalletAddFundsPopup from "modules/wallet-add-funds/components/wallet-add-funds-popup";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";

class WalletAddFundsConatiner extends Component {
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

WalletAddFundsConatiner.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(WalletAddFundsConatiner);
