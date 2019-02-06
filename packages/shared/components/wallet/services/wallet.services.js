import { fetchProfileHeaderInfo } from "shared/components/header/actions/header-actions";
import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";
import walletApi from "shared/services/api-client/wallet-api";
import authService from "shared/services/auth-service";

import * as actions from "../actions/wallet.actions";

export const fetchWallets = () => (dispatch, getState) => {
  const authorization = authService.getAuthArg();
  const { currency } = getState().accountSettings;

  dispatch(actions.fetchWallets(currency, authorization));
  dispatch(fetchProfileHeaderInfo());
};

export const fetchWalletTransactions = requestFilters => {
  const authorization = authService.getAuthArg();

  return actions.fetchWalletTransactionsDispatch(authorization, requestFilters);
};

export const fetchWalletTransactionsFilters = () => dispatch => {
  dispatch(actions.fetchWalletTransactionsFilters());
};

export const cancelWithdrawRequest = txId => (dispatch, getState) => {
  const authorization = authService.getAuthArg();

  return walletApi
    .v10WalletWithdrawRequestCancelByTxIdPost(txId, authorization)
    .then(response => {
      dispatch(
        alertMessageActions.success(
          "wallet-page.alert-messages.cancel-request-success",
          true
        )
      );
      dispatch(fetchWallets());
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
      dispatch(
        alertMessageActions.success(
          "wallet-page.alert-messages.resend-email-success",
          true
        )
      );
      dispatch(fetchWallets());
      dispatch(fetchWalletTransactions());
      return response;
    })
    .catch(err => {
      dispatch(alertMessageActions.error(err.errorMessage));
    });
};
