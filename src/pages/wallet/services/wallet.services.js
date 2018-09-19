import walletApi from "services/api-client/wallet-api";
import authService from "services/auth-service";

import * as actions from "../actions/wallet.actions";

export const fetchWalletBalance = () => (dispatch, getState) => {
  const authorization = authService.getAuthArg();
  const { currentCurrency } = getState().accountSettings;

  dispatch(actions.fetchWalletBalance(currentCurrency, authorization));
};

export const fetchWalletTransactions = filters => {
  const authorization = authService.getAuthArg();

  return walletApi.v10WalletTransactionsGet(authorization).then(data => ({
    items: data.transactions,
    total: data.total
  }));
};
