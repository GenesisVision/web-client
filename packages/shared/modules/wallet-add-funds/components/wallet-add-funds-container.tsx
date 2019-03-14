import "./wallet-add-funds-form.scss";

import { WalletData } from "gv-api-web";
import * as React from "react";
import { connect } from "react-redux";
import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";
import RootState from "shared/reducers/root-reducer";

import WalletAddFundsForm from "./wallet-add-funds-form.js";
import { DialogLoader } from "shared/components/dialog/dialog-loader/dialog-loader";
import { Dispatch } from "redux";
import { ActionType } from "shared/utils/types";

export interface CurrentWallet {
  currency: string;
  available: number;
}

interface IWalletAddFundsContainerOwnProps {
  currentWallet: CurrentWallet;
}

interface IWalletAddFundsContainerStateProps {
  wallets: WalletData[];
}

interface IWalletAddFundsContainerDispatchProps {
  notifySuccess(x: string): void;
  notifyError(x: string): void;
}

type IWalletAddFundsContainerProps = IWalletAddFundsContainerOwnProps &
  IWalletAddFundsContainerStateProps &
  IWalletAddFundsContainerDispatchProps;

class WalletAddFundsContainer extends React.Component<
  IWalletAddFundsContainerProps
> {
  render() {
    const { currentWallet, notifySuccess, notifyError, wallets } = this.props;
    if (!wallets.length) return <DialogLoader />;
    const enabledWallets = wallets.filter(wallet => wallet.isDepositEnabled);
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

const mapStateToProps = (
  state: RootState
): IWalletAddFundsContainerStateProps => {
  const wallets = state.wallet.info.data ? state.wallet.info.data.wallets : [];
  return { wallets };
};

const mapDispatchToProps = (
  dispatch: Dispatch<ActionType>
): IWalletAddFundsContainerDispatchProps => ({
  notifySuccess: text => dispatch(alertMessageActions.success(text)),
  notifyError: text => dispatch(alertMessageActions.error(text))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WalletAddFundsContainer);
