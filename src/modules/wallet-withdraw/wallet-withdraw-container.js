import Dialog from "components/dialog/dialog";
import WalletWithdrawPopup from "modules/wallet-withdraw/components/wallet-withdraw-popup";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";

class WalletWithdrawContainer extends Component {
  render() {
    return (
      <Dialog open={this.props.open} onClose={this.props.onClose}>
        <WalletWithdrawPopup currencies={this.props.currencies} />
      </Dialog>
    );
  }
}

WalletWithdrawContainer.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

const mapStateToProps = ({ paymentInfo }) => {
  const { data = {} } = paymentInfo;
  return {
    currencies: data.outputCurrencies || []
  };
};

export default connect(mapStateToProps)(WalletWithdrawContainer);
