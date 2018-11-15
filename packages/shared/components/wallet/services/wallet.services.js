import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";
import walletApi from "shared/services/api-client/wallet-api";
import authService from "shared/services/auth-service";

import * as actions from "../actions/wallet.actions";

export const fetchWalletBalance = () => (dispatch, getState) => {
  const authorization = authService.getAuthArg();
  const { currency } = getState().accountSettings;

  dispatch(actions.fetchWalletBalance(currency, authorization));
};

export const fetchWalletTransactions = requestFilters => {
  const authorization = authService.getAuthArg();

  return actions.fetchWalletTransactionsDispatch(authorization, requestFilters);
};

export const cancelWithdrawRequest = txId => (dispatch, getState) => {
  const authorization = authService.getAuthArg();

  return walletApi
    .v10WalletWithdrawRequestCancelByTxIdPost(txId, authorization)
    .then(response => {
      dispatch(
        alertMessageActions.success(
          "wallet.alert-messages.cancel-request-success",
          true
        )
      );
      dispatch(fetchWalletTransactions());
      return response;
    })
    .catch(err => {
      dispatch(alertMessageActions.error(err.errorMessage));
    });
};

export const resendWithdrawRequest = txId => (dispatch, getState) => {
  const authorization = authService.getAuthArg();

  return walletApi
    .v10WalletWithdrawRequestResendByTxIdPost(txId, authorization)
    .then(response => {
      dispatch(fetchWalletTransactions());
      return response;
    })
    .catch(err => {
      dispatch(alertMessageActions.error(err.errorMessage));
    });
};
