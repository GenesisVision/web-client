import "./wallet-add-funds-form.scss";

import { WalletData } from "gv-api-web";
import * as React from "react";
import { connect } from "react-redux";
import { DialogLoader } from "shared/components/dialog/dialog-loader/dialog-loader";
import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";
import RootState from "shared/reducers/root-reducer";

import WalletAddFundsForm, { CurrentWallet } from "./wallet-add-funds-form";

class WalletAddFundsContainer extends React.Component<Props> {
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

const mapStateToProps = (state: RootState): StateProps => {
  if (!state.accountSettings) return { wallets: [] };
  const wallets = state.wallet.info.data ? state.wallet.info.data.wallets : [];
  return { wallets };
};

const mapDispatchToProps: DispatchProps = {
  notifySuccess: alertMessageActions.success,
  notifyError: alertMessageActions.error
};

interface OwnProps {
  currentWallet: CurrentWallet;
}

interface StateProps {
  wallets: WalletData[];
}

interface DispatchProps {
  notifySuccess(text: string): void;
  notifyError(text: string): void;
}

interface Props extends OwnProps, StateProps, DispatchProps {}

export default connect<StateProps, DispatchProps, OwnProps, RootState>(
  mapStateToProps,
  mapDispatchToProps
)(WalletAddFundsContainer);
