import { fetchWalletTransactions } from "pages/wallet/services/wallet.services";
import { walletApiProxy } from "services/api-client/wallet-api";
import authService from "services/auth-service";

export const fetchPaymentInfo = () => {
  return walletApiProxy.v10WalletWithdrawInfoGet(authService.getAuthArg());
};

export const newWithdrawRequest = data => (dispatch, getState) => {
  return walletApiProxy
    .v10WalletWithdrawRequestNewPost(authService.getAuthArg(), { model: data })
    .then(response => {
      dispatch(fetchWalletTransactions());
      return response;
    })
    .catch(error => error);
};
