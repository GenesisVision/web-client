import { CreateWithdrawalRequestModel } from "gv-api-web";
import { fetchWalletTransactions } from "shared/components/wallet/services/wallet.services";
import walletApi from "shared/services/api-client/wallet-api";
import authService from "shared/services/auth-service";
import { MiddlewareDispatch } from "shared/utils/types";

export const fetchPaymentInfo = () => {
  return walletApi.getUserWithdrawalSummary(authService.getAuthArg());
};

export const newWithdrawRequest = (data: CreateWithdrawalRequestModel) => (
  dispatch: MiddlewareDispatch
): Promise<any> => {
  return walletApi
    .createWithdrawalRequest(authService.getAuthArg(), { model: data })
    .then(response => {
      dispatch(fetchWalletTransactions());
      return response;
    });
};
