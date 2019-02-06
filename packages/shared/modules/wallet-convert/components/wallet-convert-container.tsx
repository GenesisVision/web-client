import "./wallet-convert-form.scss";

import { WalletsInfo } from "gv-api-web";
import * as React from "react";
import { connect } from "react-redux";
import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";
import walletApi from "shared/services/api-client/wallet-api";
import authService from "shared/services/auth-service";
import { IDispatchable } from "shared/utils/types";

import WalletConvertForm from "./wallet-covert-form";

export interface CurrentWallet {
  currency: string;
  available: number;
}

interface IWalletConvertContainerState {
  isPending: boolean;
  data?: WalletsInfo;
}

interface IWalletConvertContainerProps {
  currentWallet: CurrentWallet;
}

interface IWalletConvertContainerDispatchProps {
  notifySuccess(x: string): IDispatchable<void>;
  notifyError(x: string): IDispatchable<void>;
}

class WalletConvertContainer extends React.Component<
  IWalletConvertContainerProps & IWalletConvertContainerDispatchProps,
  IWalletConvertContainerState
> {
  state: IWalletConvertContainerState = {
    isPending: false,
    data: null
  };

  componentDidMount() {
    this.setState({ isPending: true });
    walletApi
      .v10WalletAddressesGet(authService.getAuthArg())
      .then(data => this.setState({ data, isPending: false }));
  }

  render() {
    if (!this.state.data) return null;
    const { wallets } = this.state.data;
    const { currentWallet, notifySuccess, notifyError } = this.props;
    return (
      <WalletConvertForm
        wallets={wallets}
        currentWallet={currentWallet}
        notifySuccess={notifySuccess}
        notifyError={notifyError}
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
)(WalletConvertContainer);
