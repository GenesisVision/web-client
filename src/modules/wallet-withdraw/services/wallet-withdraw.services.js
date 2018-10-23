import * as walletActions from "pages/wallet/actions/wallet.actions";
import { walletApiProxy } from "services/api-client/wallet-api";
import authService from "services/auth-service";

export const fetchPaymentInfo = () => {
  return walletApiProxy.v10WalletWithdrawInfoGet(authService.getAuthArg());
};

export const newWithdrawRequest = data => (dispatch, getState) => {
  const authorization = authService.getAuthArg();
  const prevFilters = getState().wallet.transactions.filters;

  return walletApiProxy
    .v10WalletWithdrawRequestNewPost(authService.getAuthArg(), { model: data })
    .then(response => {
      dispatch(
        walletActions.fetchWalletTransactions(authorization, {
          ...prevFilters
        })
      );
      return response;
    })
    .catch(error => error);
};
