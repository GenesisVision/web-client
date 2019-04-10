import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { DialogLoader } from "shared/components/dialog/dialog-loader/dialog-loader";
import { updateWalletTimestamp } from "shared/components/wallet/actions/wallet.actions";

import * as walletWithdrawService from "../services/wallet-withdraw.services";
import WalletWithdrawForm from "./wallet-withdraw-form";
import WalletWithdrawRequest from "./wallet-withdraw-request/wallet-withdraw-request";

class WalletWithdrawContainer extends Component {
  state = {
    errorMessage: null,
    success: false
  };

  handleSubmit = (values, setSubmitting) => {
    this.props.service
      .newWithdrawRequest({ ...values, amount: Number(values.amount) })
      .then(() => {
        this.setState({
          success: true
        });
        this.props.service.updateWalletTimestamp();
      })
      .catch(error => {
        this.setState({
          success: false,
          errorMessage: error.errorMessage
        });
        setSubmitting(false);
      });
  };

  render() {
    const { errorMessage, success } = this.state;
    const { twoFactorEnabled, wallets, currentWallet } = this.props;

    if (!wallets.length) return <DialogLoader />;

    const enabledWallets = wallets.filter(wallet => wallet.isWithdrawalEnabled);

    return success ? (
      <WalletWithdrawRequest />
    ) : (
      <WalletWithdrawForm
        wallets={enabledWallets}
        currentWallet={currentWallet}
        errorMessage={errorMessage}
        onSubmit={this.handleSubmit}
        twoFactorEnabled={twoFactorEnabled}
      />
    );
  }
}

const mapStateToProps = state => {
  if (!state.accountSettings) return { twoFactorEnabled: false, wallets: [] };
  const wallets = state.wallet.info.data ? state.wallet.info.data.wallets : [];
  const twoFactorEnabled = state.accountSettings.twoFactorAuth.data
    ? state.accountSettings.twoFactorAuth.data.twoFactorEnabled
    : false;
  return { twoFactorEnabled, wallets };
};

const mapDispatchToProps = dispatch => ({
  service: bindActionCreators(
    { ...walletWithdrawService, updateWalletTimestamp },
    dispatch
  )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WalletWithdrawContainer);
