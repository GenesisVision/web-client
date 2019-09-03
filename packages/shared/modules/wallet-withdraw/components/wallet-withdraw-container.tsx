import {
  CancelablePromise,
  CreateWithdrawalRequestModel,
  WalletData
} from "gv-api-web";
import * as React from "react";
import { useCallback } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { DialogLoader } from "shared/components/dialog/dialog-loader/dialog-loader";
import { updateWalletTimestampAction } from "shared/components/wallet/actions/wallet.actions";
import { walletsSelector } from "shared/components/wallet/reducers/wallet.reducers";
import useErrorMessage from "shared/hooks/error-message.hook";
import useIsOpen from "shared/hooks/is-open.hook";
import { twoFactorEnabledSelector } from "shared/reducers/2fa-reducer";
import { RootState } from "shared/reducers/root-reducer";
import { MiddlewareDispatch, SetSubmittingType } from "shared/utils/types";

import * as walletWithdrawService from "../services/wallet-withdraw.services";
import WalletWithdrawForm, {
  IWalletWithdrawFormValues
} from "./wallet-withdraw-form";
import WalletWithdrawRequest from "./wallet-withdraw-request/wallet-withdraw-request";

const WalletWithdrawContainer: React.FC<Props> = ({
  twoFactorEnabled,
  wallets,
  currentWallet,
  service
}) => {
  const [isSuccess, setSuccess, setNotSuccess] = useIsOpen();
  const { errorMessage, setErrorMessage } = useErrorMessage();
  const handleSubmit = useCallback(
    (values: IWalletWithdrawFormValues, setSubmitting: SetSubmittingType) => {
      service
        .newWithdrawRequest({ ...values, amount: Number(values.amount) })
        .then(() => {
          setSuccess();
          service.updateWalletTimestamp();
        })
        .catch(error => {
          setNotSuccess();
          setErrorMessage(error);
          setSubmitting(false);
        });
    },
    []
  );
  if (!wallets.length) return <DialogLoader />;
  const enabledWallets = wallets.filter(wallet => wallet.isWithdrawalEnabled);
  return isSuccess ? (
    <WalletWithdrawRequest />
  ) : (
    <WalletWithdrawForm
      wallets={enabledWallets}
      currentWallet={currentWallet}
      errorMessage={errorMessage}
      onSubmit={handleSubmit}
      twoFactorEnabled={twoFactorEnabled}
    />
  );
};

interface Props extends DispatchProps, StateProps, OwnProps {}

interface OwnProps {
  currentWallet: WalletData;
}

interface DispatchProps {
  service: {
    newWithdrawRequest: (
      data: CreateWithdrawalRequestModel
    ) => CancelablePromise<any>;
    updateWalletTimestamp: () => void;
  };
}

interface StateProps {
  wallets: WalletData[];
  twoFactorEnabled: boolean;
}

const mapStateToProps = (state: RootState): StateProps => ({
  twoFactorEnabled: twoFactorEnabledSelector(state),
  wallets: walletsSelector(state)
});

const mapDispatchToProps = (dispatch: MiddlewareDispatch): DispatchProps => ({
  service: {
    updateWalletTimestamp: () => dispatch(updateWalletTimestampAction()),
    newWithdrawRequest: data =>
      dispatch(walletWithdrawService.newWithdrawRequest(data))
  }
});

export default compose<React.ComponentType<OwnProps>>(
  connect<StateProps, DispatchProps, OwnProps, RootState>(
    mapStateToProps,
    mapDispatchToProps
  ),
  React.memo
)(WalletWithdrawContainer);
