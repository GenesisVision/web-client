import "./wallet-add-funds-form.scss";

import { WalletData } from "gv-api-web";
import * as React from "react";
import { connect } from "react-redux";
import { Dispatch, bindActionCreators } from "redux";
import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";
import RootState from "shared/reducers/root-reducer";

import WalletAddFundsForm from "./wallet-add-funds-form.js";

export interface CurrentWallet {
  currency: string;
  available: number;
}

interface OwnProps {
  currentWallet: CurrentWallet;
}

interface StateProps {
  wallets?: WalletData[];
}

interface DispatchProps {
  notifySuccess(x: string): void;
  notifyError(x: string): void;
}

interface Props extends OwnProps, StateProps, DispatchProps {}

class WalletAddFundsContainer extends React.Component<Props> {
  render() {
    const { currentWallet, notifySuccess, notifyError, wallets } = this.props;
    if (!wallets) return null;
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

const mapStateToProps = (state: RootState): StateProps => {
  if (!state.wallet.info.data) return {};
  return { wallets: state.wallet.info.data.wallets };
};

const mapDispatchToProps: DispatchProps = {
  notifySuccess: alertMessageActions.success,
  notifyError: alertMessageActions.error
};

export default connect<StateProps, DispatchProps, OwnProps, RootState>(
  mapStateToProps,
  mapDispatchToProps
)(WalletAddFundsContainer);
