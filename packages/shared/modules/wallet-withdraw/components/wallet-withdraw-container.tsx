import { WalletData } from "gv-api-web";
import * as React from "react";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DialogLoader } from "shared/components/dialog/dialog-loader/dialog-loader";
import { updateWalletTimestampAction } from "shared/components/wallet/actions/wallet.actions";
import { walletsSelector } from "shared/components/wallet/reducers/wallet.reducers";
import useApiRequest from "shared/hooks/api-request.hook";
import useIsOpen from "shared/hooks/is-open.hook";
import { twoFactorEnabledSelector } from "shared/reducers/2fa-reducer";
import { SetSubmittingType } from "shared/utils/types";

import * as walletWithdrawService from "../services/wallet-withdraw.services";
import WalletWithdrawForm, {
  IWalletWithdrawFormValues
} from "./wallet-withdraw-form";
import WalletWithdrawRequest from "./wallet-withdraw-request/wallet-withdraw-request";

const _WalletWithdrawContainer: React.FC<Props> = ({ currentWallet }) => {
  const twoFactorEnabled = useSelector(twoFactorEnabledSelector);
  const wallets = useSelector(walletsSelector);
  const dispatch = useDispatch();
  const [isSuccess, setSuccess, setNotSuccess] = useIsOpen();
  const { errorMessage, sendRequest } = useApiRequest({
    request: values =>
      dispatch(walletWithdrawService.newWithdrawRequest(values)),
    catchCallback: () => setNotSuccess()
  });
  const handleSubmit = useCallback(
    (values: IWalletWithdrawFormValues, setSubmitting: SetSubmittingType) => {
      sendRequest(
        { ...values, amount: Number(values.amount) },
        setSubmitting
      ).then(() => {
        setSuccess();
        dispatch(updateWalletTimestampAction());
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

interface Props {
  currentWallet: WalletData;
}

const WalletWithdrawContainer = React.memo(_WalletWithdrawContainer);
export default WalletWithdrawContainer;
