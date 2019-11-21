import "./wallet-add-funds-form.scss";

import { DialogLoader } from "components/dialog/dialog-loader/dialog-loader";
import { walletsSelector } from "components/wallet/reducers/wallet.reducers";
import { WalletData } from "gv-api-web";
import { alertMessageActions } from "modules/alert-message/actions/alert-message-actions";
import * as React from "react";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

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
