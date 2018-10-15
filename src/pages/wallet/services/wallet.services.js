import { walletApiProxy } from "services/api-client/wallet-api";
import authService from "services/auth-service";

import * as actions from "../actions/wallet.actions";

export const fetchWalletBalance = () => (dispatch, getState) => {
  const authorization = authService.getAuthArg();
  const { currency } = getState().accountSettings;

  dispatch(actions.fetchWalletBalance(currency, authorization));
};

export const fetchWalletTransactions = filters => {
  const authorization = authService.getAuthArg();

  return walletApiProxy
    .v10WalletTransactionsGet(authorization, filters)
    .then(({ data }) => ({
      items: data.transactions,
      total: data.total
    }));
};
