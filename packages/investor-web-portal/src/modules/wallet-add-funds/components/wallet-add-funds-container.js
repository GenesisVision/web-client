import "./wallet-add-funds-form.scss";

import WalletAddFundsForm from "modules/wallet-add-funds/components/wallet-add-funds-form";
import React, { Component } from "react";
import { connect } from "react-redux";
import { walletApiProxy } from "services/api-client/wallet-api";
import authService from "services/auth-service";
import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";

class WalletAddFundsContainer extends Component {
  state = {
    isPending: false,
    data: null
  };

  componentDidMount() {
    this.setState({ isPending: true });
    walletApiProxy
      .v10WalletAddressesGet(authService.getAuthArg())
      .then(data => this.setState({ ...data }));
  }

  render() {
    if (!this.state.data) return null;
    const { wallets } = this.state.data;
    return (
      <WalletAddFundsForm
        wallets={wallets}
        notifySuccess={this.props.notifySuccess}
        notifyError={this.props.notifyError}
      />
    );
  }
}

const mapDispatchToProps = dispatch => ({
  notifySuccess: text => dispatch(alertMessageActions.success(text)),
  notifyError: text => dispatch(alertMessageActions.error(text))
});

export default connect(
  null,
  mapDispatchToProps
)(WalletAddFundsContainer);
