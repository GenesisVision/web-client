import { CreateWithdrawalRequestModel } from "gv-api-web";
import { fetchWalletTransactions } from "pages/wallet/services/wallet.services";
import walletApi from "services/api-client/wallet-api";
import authService from "services/auth-service";
import { MiddlewareDispatch } from "utils/types";

export const newWithdrawRequest = (data: CreateWithdrawalRequestModel) => (
  dispatch: MiddlewareDispatch
): Promise<any> => {
  return walletApi
    .createWithdrawalRequest(authService.getAuthArg(), { body: data })
    .then(response => {
      dispatch(fetchWalletTransactions());
      return response;
    });
};
