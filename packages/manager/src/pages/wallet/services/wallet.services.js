import { calculateTotalPages } from "shared/components/table/helpers/paging.helpers";
import { composeRequestFilters } from "modules/table/services/table.service";
import { walletApiProxy } from "shared/services/api-client/wallet-api";
import authService from "shared/services/auth-service";
import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";

import * as actions from "../actions/wallet.actions";
import { WALLET_TRANSACTIONS_FILTERS_DEFAULT } from "../components/wallet-transactions/wallet-transactions.constants";

export const fetchWalletBalance = () => (dispatch, getState) => {
  const authorization = authService.getAuthArg();
  const { currency } = getState().accountSettings;

  dispatch(actions.fetchWalletBalance(currency, authorization));
};

export const fetchWalletTransactions = filters => (dispatch, getState) => {
  const authorization = authService.getAuthArg();
  if (!filters) filters = getState().wallet.transactions.filters;
  let requestFilters = composeRequestFilters({
    ...filters,
    defaultFilters: WALLET_TRANSACTIONS_FILTERS_DEFAULT
  });

  dispatch(
    actions.fetchWalletTransactionsDispatch(authorization, requestFilters)
  ).then(response => {
    dispatch(
      actions.updateWalletTransactionsFilters({
        ...filters,
        paging: {
          ...filters.paging,
          totalPages: calculateTotalPages(
            response.value.total,
            filters.paging.itemsOnPage
          )
        }
      })
    );
  });
};

export const updateWalletTransactionsFilters = filters => dispatch => {
  dispatch(actions.updateWalletTransactionsFilters(filters));
};

export const cancelWithdrawRequest = txId => (dispatch, getState) => {
  const authorization = authService.getAuthArg();

  return walletApiProxy
    .v10WalletWithdrawRequestCancelByTxIdPost(txId, authorization)
    .then(response => {
      dispatch(
        alertMessageActions.success(
          "wallet.alert-messages.cancel-request-success",
          true
        )
      );
      dispatch(fetchWalletBalance());
      dispatch(fetchWalletTransactions());
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
      dispatch(fetchWalletBalance());
      dispatch(fetchWalletTransactions());
      return response;
    })
    .catch(err => {
      dispatch(alertMessageActions.error(err.errorMessage));
    });
};
