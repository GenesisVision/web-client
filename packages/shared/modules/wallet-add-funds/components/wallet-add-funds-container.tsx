import "./wallet-add-funds-form.scss";

import { WalletsInfo } from "gv-api-web";
import * as React from "react";
import { connect } from "react-redux";
import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";
import walletApi from "shared/services/api-client/wallet-api";
import authService from "shared/services/auth-service";
import { IDispatchable } from "shared/utils/types";

import WalletAddFundsForm from "./wallet-add-funds-form.js";

export interface CurrentWallet {
  currency: string;
  available: number;
}

interface IWalletAddFundsContainerState {
  isPending: boolean;
  data?: WalletsInfo;
}

interface IWalletAddFundsContainerProps {
  currentWallet: CurrentWallet;
}

interface IWalletAddFundsContainerDispatchProps {
  notifySuccess(x: string): IDispatchable<void>;
  notifyError(x: string): IDispatchable<void>;
}

class WalletAddFundsContainer extends React.Component<
  IWalletAddFundsContainerProps & IWalletAddFundsContainerDispatchProps,
  IWalletAddFundsContainerState
> {
  state: IWalletAddFundsContainerState = {
    isPending: false,
    data: null
  };

  render() {
    const { currentWallet, notifySuccess, notifyError, wallets } = this.props;
    const enabledWallets = wallets.filter(wallet => wallet.isDepositEnabled);
    console.log();
    return (
      <WalletAddFundsForm
        wallets={enabledWallets}
        currentWallet={currentWallet}
        notifySuccess={notifySuccess}
        notifyError={notifyError}
      />
    );
  }
}

const mapStateToProps = state => {
  if (!state.wallet.info.data) return;
  return { wallets: state.wallet.info.data.wallets };
};

const mapDispatchToProps = dispatch => ({
  notifySuccess: text => dispatch(alertMessageActions.success(text)),
  notifyError: text => dispatch(alertMessageActions.error(text))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WalletAddFundsContainer);
