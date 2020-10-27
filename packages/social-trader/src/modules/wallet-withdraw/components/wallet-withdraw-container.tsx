import { WalletData } from "gv-api-web";
import useApiRequest from "hooks/api-request.hook";
import useIsOpen from "hooks/is-open.hook";
import { updateWalletTimestampAction } from "pages/wallet/actions/wallet.actions";
import * as React from "react";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useTFAStatus } from "utils/2fa";
import { postponeCallback } from "utils/hook-form.helpers";
import { MiddlewareDispatch } from "utils/types";

import * as walletWithdrawService from "../services/wallet-withdraw.services";
import WalletWithdrawForm, {
  IWalletWithdrawFormValues
} from "./wallet-withdraw-form";
import WalletWithdrawRequest from "./wallet-withdraw-request/wallet-withdraw-request";

const _WalletWithdrawContainer: React.FC<Props> = ({ currentWallet }) => {
  const { twoFactorEnabled } = useTFAStatus();
  const dispatch = useDispatch<MiddlewareDispatch>();
  const [isSuccess, setSuccess, setNotSuccess] = useIsOpen();
  const updateWalletMiddleware = () => {
    setSuccess();
    dispatch(updateWalletTimestampAction());
  };
  const { errorMessage, sendRequest } = useApiRequest({
    middleware: [postponeCallback(updateWalletMiddleware)],
    request: values =>
      dispatch(walletWithdrawService.newWithdrawRequest(values)),
    catchCallback: () => setNotSuccess()
  });
  const handleSubmit = useCallback((values: IWalletWithdrawFormValues) => {
    return sendRequest({ ...values, amount: Number(values.amount) });
  }, []);
  return isSuccess ? (
    <WalletWithdrawRequest />
  ) : (
    <WalletWithdrawForm
      currentWallet={currentWallet}
      errorMessage={errorMessage}
      onSubmit={handleSubmit}
      twoFactorEnabled={twoFactorEnabled!}
    />
  );
};

interface Props {
  currentWallet: WalletData;
}

const WalletWithdrawContainer = React.memo(_WalletWithdrawContainer);
export default WalletWithdrawContainer;
