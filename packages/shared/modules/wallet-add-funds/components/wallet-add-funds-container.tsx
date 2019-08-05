import "./wallet-add-funds-form.scss";

import { WalletData } from "gv-api-web";
import * as React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { DialogLoader } from "shared/components/dialog/dialog-loader/dialog-loader";
import { walletsSelector } from "shared/components/wallet/reducers/wallet.reducers";
import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";
import { RootState } from "shared/reducers/root-reducer";

import WalletAddFundsForm from "./wallet-add-funds-form";

const _WalletAddFundsContainer: React.FC<Props> = ({
  currentWallet,
  notifySuccess,
  notifyError,
  wallets
}) => (
  <WalletAddFundsForm
    condition={!!wallets.length}
    loader={<DialogLoader />}
    wallets={wallets.filter(wallet => wallet.isDepositEnabled)}
    currentWallet={currentWallet}
    notifySuccess={notifySuccess}
    notifyError={notifyError}
  />
);

const mapStateToProps = (state: RootState): StateProps => ({
  wallets: walletsSelector(state)
});

const mapDispatchToProps: DispatchProps = {
  notifySuccess: alertMessageActions.success,
  notifyError: alertMessageActions.error
};

interface OwnProps {
  currentWallet: WalletData;
}

interface StateProps {
  wallets: WalletData[];
}

interface DispatchProps {
  notifySuccess(text: string): void;
  notifyError(text: string): void;
}

interface Props extends OwnProps, StateProps, DispatchProps {}

const WalletAddFundsContainer = compose<React.ComponentType<OwnProps>>(
  connect<StateProps, DispatchProps, OwnProps, RootState>(
    mapStateToProps,
    mapDispatchToProps
  ),
  React.memo
)(_WalletAddFundsContainer);
export default WalletAddFundsContainer;
