import { CreateWithdrawalRequestModel } from "gv-api-web";
import { fetchWalletTransactions } from "shared/components/wallet/services/wallet.services";
import walletApi from "shared/services/api-client/wallet-api";
import authService from "shared/services/auth-service";

import { MiddlewareDispatch } from "../../../utils/types";

export const fetchPaymentInfo = () => {
  return walletApi.v10WalletWithdrawInfoGet(authService.getAuthArg());
};

export const newWithdrawRequest = (data: CreateWithdrawalRequestModel) => (
  dispatch: MiddlewareDispatch
): Promise<any> => {
  return walletApi
    .v10WalletWithdrawRequestNewPost(authService.getAuthArg(), { model: data })
    .then(response => {
      dispatch(fetchWalletTransactions());
      return response;
    });
};
