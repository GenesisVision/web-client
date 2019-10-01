import "./wallet-add-funds-form.scss";

import { WalletData } from "gv-api-web";
import * as React from "react";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DialogLoader } from "shared/components/dialog/dialog-loader/dialog-loader";
import { walletsSelector } from "shared/components/wallet/reducers/wallet.reducers";
import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";

import WalletAddFundsForm from "./wallet-add-funds-form";

const _WalletAddFundsContainer: React.FC<Props> = ({ currentWallet }) => {
  const dispatch = useDispatch();
  const wallets = useSelector(walletsSelector);
  const notifySuccess = useCallback(
    (message: string) => dispatch(alertMessageActions.success(message)),
    []
  );
  const notifyError = useCallback(
    (message: string) => dispatch(alertMessageActions.error(message)),
    []
  );
  return (
    <WalletAddFundsForm
      condition={!!wallets.length && !!currentWallet}
      loader={<DialogLoader />}
      wallets={wallets.filter(wallet => wallet.isDepositEnabled)}
      currentWallet={currentWallet}
      notifySuccess={notifySuccess}
      notifyError={notifyError}
    />
  );
};

interface Props {
  currentWallet: WalletData;
}

const WalletAddFundsContainer = React.memo(_WalletAddFundsContainer);
export default WalletAddFundsContainer;
