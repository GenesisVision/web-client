import {
  fetchWalletBalance,
  fetchWalletTransactions
} from "pages/wallet/services/wallet.services";
import { walletApiProxy } from "shared/services/api-client/wallet-api";
import authService from "shared/services/auth-service";

export const fetchPaymentInfo = () => {
  return walletApiProxy.v10WalletWithdrawInfoGet(authService.getAuthArg());
};

export const newWithdrawRequest = data => (dispatch, getState) => {
  return walletApiProxy
    .v10WalletWithdrawRequestNewPost(authService.getAuthArg(), { model: data })
    .then(response => {
      dispatch(fetchWalletBalance());
      dispatch(fetchWalletTransactions());
      return response;
    })
    .catch(error => error);
};
