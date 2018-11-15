import { fetchWalletTransactions } from "pages/wallet/services/wallet.services";
import walletApi from "shared/services/api-client/wallet-api";
import authService from "shared/services/auth-service";

export const fetchPaymentInfo = () => {
  return walletApi.v10WalletWithdrawInfoGet(authService.getAuthArg());
};

export const newWithdrawRequest = data => (dispatch, getState) => {
  return walletApi
    .v10WalletWithdrawRequestNewPost(authService.getAuthArg(), { model: data })
    .then(response => {
      dispatch(fetchWalletTransactions());
      return response;
    });
};
