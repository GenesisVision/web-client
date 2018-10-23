import { walletApiProxy } from "services/api-client/wallet-api";
import authService from "services/auth-service";
import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";

import * as actions from "../actions/wallet.actions";

export const fetchWalletBalance = () => (dispatch, getState) => {
  const authorization = authService.getAuthArg();
  const { currency } = getState().accountSettings;

  dispatch(actions.fetchWalletBalance(currency, authorization));
};

export const fetchWalletTransactions = newFilters => (dispatch, getState) => {
  const authorization = authService.getAuthArg();
  const prevFilters = getState().wallet.transactions.filters;

  dispatch(
    actions.fetchWalletTransactions(authorization, {
      ...prevFilters,
      ...newFilters
    })
  );
  dispatch(actions.updateWalletTransactionsFilters(newFilters));
};

export const cancelWithdrawRequest = txId => (dispatch, getState) => {
  const authorization = authService.getAuthArg();
  const prevFilters = getState().wallet.transactions.filters;

  return walletApiProxy
    .v10WalletWithdrawRequestCancelByTxIdPost(txId, authorization)
    .then(response => {
      dispatch(
        alertMessageActions.success(
          "wallet.alert-messages.cancel-request-success",
          true
        )
      );
      dispatch(
        actions.fetchWalletTransactions(authorization, {
          ...prevFilters
        })
      );
      return response;
    })
    .catch(err => {
      dispatch(alertMessageActions.error(err.errorMessage));
    });
};

export const resendWithdrawRequest = txId => (dispatch, getState) => {
  const authorization = authService.getAuthArg();

  return walletApiProxy
    .v10WalletWithdrawRequestResendByTxIdPost(txId, authorization)
    .then(response => {
      dispatch(
        alertMessageActions.success(
          "wallet.alert-messages.resend-email-success",
          true
        )
      );
      return response;
    })
    .catch(err => {
      dispatch(alertMessageActions.error(err.errorMessage));
    });
};
