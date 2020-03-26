import { CreateWithdrawalRequestModel } from "gv-api-web";
import { fetchWalletTransactions } from "pages/wallet/services/wallet.services";
import { api, Token } from "services/api-client/swagger-custom-client";
import { MiddlewareDispatch } from "utils/types";

export const newWithdrawRequest = (data: CreateWithdrawalRequestModel) => (
  dispatch: MiddlewareDispatch
): Promise<any> => {
  return api
    .wallet()
    .createWithdrawalRequest({ body: data })
    .then(response => {
      dispatch(fetchWalletTransactions());
      return response;
    });
};
