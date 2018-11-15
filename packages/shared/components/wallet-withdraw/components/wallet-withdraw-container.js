import WalletWithdrawForm from "modules/wallet-withdraw/components/wallet-withdraw-form";
import WalletWithdrawRequest from "modules/wallet-withdraw/components/wallet-withdraw-request/wallet-withdraw-request";
import * as walletWithdrawService from "modules/wallet-withdraw/services/wallet-withdraw.services";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class WalletWithdrawContainer extends Component {
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
    this.setState({ isPending: true });
    this.props.service
      .newWithdrawRequest({ ...values, amount: Number(values.amount) })
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
    const { wallets, availableToWithdrawal } = data;
    const { twoFactorEnabled } = this.props;

    return success ? (
      <WalletWithdrawRequest />
    ) : (
      <WalletWithdrawForm
        availableToWithdrawal={availableToWithdrawal}
        wallets={wallets}
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
)(WalletWithdrawContainer);
