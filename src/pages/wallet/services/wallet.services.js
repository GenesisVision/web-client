import walletApi from "services/api-client/wallet-api";
import authService from "services/auth-service";

import * as actions from "../actions/wallet.actions";
import { walletTransactionsResponseMock } from "./wallet-transactions-response-mock";

export const fetchWalletBalance = () => (dispatch, getState) => {
  const authorization = authService.getAuthArg();
  const { currency } = getState().accountSettings;

  dispatch(actions.fetchWalletBalance(currency, authorization));
};

export const fetchWalletTransactions = filters => {
  const authorization = authService.getAuthArg();

  return walletApi
    .v10WalletTransactionsGet(authorization, filters)
    .then(data => ({
      items: walletTransactionsResponseMock.data.transactions,
      total: walletTransactionsResponseMock.data.total
    }));
};
