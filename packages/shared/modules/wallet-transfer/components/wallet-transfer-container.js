import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as walletWithdrawService from "shared/modules/wallet-withdraw/services/wallet-withdraw.services";

import WalletTransferForm from "./wallet-transfer-form";

class WalletTransferContainer extends Component {
  state = {
    isPending: false,
    data: null,
    errorMessage: null,
    success: false
  };

  componentDidMount() {
    this.setState({ isPending: true });
    walletWithdrawService
      .fetchPaymentInfo()
      .then(data => this.setState({ data, isPending: false }));
  }

  handleSubmit = values => {
    const { amount } = values;
    this.setState({ isPending: true });
    this.props.service
      .walletTransferRequest({
        from: values.currencyFrom,
        to: values.currencyTo,
        amount
      })
      .then(response => {
        this.setState({
          isPending: false,
          success: true
        });
      })
      .catch(error => {
        this.setState({
          isPending: false,
          success: false,
          errorMessage: error.errorMessage
        });
      });
  };

  render() {
    if (!this.state.data) return null;
    const { isPending, data, errorMessage, success } = this.state;
    const { wallets } = data;
    const { twoFactorEnabled, currentWallet } = this.props;

    return (
      <WalletTransferForm
        wallets={wallets}
        currentWallet={currentWallet}
        disabled={isPending}
        errorMessage={errorMessage}
        onSubmit={this.handleSubmit}
        twoFactorEnabled={twoFactorEnabled}
      />
    );
  }
}

const mapStateToProps = state => {
  if (!state.accountSettings) return;
  const { twoFactorEnabled } = state.accountSettings.twoFactorAuth.data;
  return { twoFactorEnabled };
};

const mapDispatchToProps = dispatch => ({
  service: bindActionCreators(walletWithdrawService, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WalletTransferContainer);
