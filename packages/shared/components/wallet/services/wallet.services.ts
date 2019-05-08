import {
  CancelablePromise,
  CopyTradingAccountInfo,
  WalletMultiAvailable
} from "gv-api-web";
import { FilteringType } from "shared/components/table/components/filtering/filter.type";
import { mapToTableItems } from "shared/components/table/helpers/mapper";
import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";
import { CURRENCIES } from "shared/modules/currency-select/currency-select.constants";
import signalApi from "shared/services/api-client/signal-api";
import walletApi from "shared/services/api-client/wallet-api";
import authService from "shared/services/auth-service";
import { MiddlewareDispatch, RootThunk } from "shared/utils/types";

import * as actions from "../actions/wallet.actions";

export const fetchWallets = (): RootThunk<void> => (dispatch, getState) => {
  const authorization = authService.getAuthArg();
  const { info } = getState().wallet;
  if (info.isPending) return;
  const { currency } = getState().accountSettings;
  dispatch(actions.updateWalletTimestamp());
  dispatch(actions.fetchWallets(currency, authorization));
};

export const fetchAccounts = (): RootThunk<void> => (dispatch, getState) => {
  const authorization = authService.getAuthArg();
  const { info } = getState().copyTradingAccounts;
  if (info.isPending) return;
  dispatch(actions.updateAccountTimestamp());
  dispatch(actions.fetchAccounts(authorization));
};

export const fetchBaseWallets = (): RootThunk<
  Promise<WalletMultiAvailable>
> => (dispatch, getState) => {
  const authorization = authService.getAuthArg();
  const { currency } = getState().accountSettings;
  return walletApi.v10WalletMultiByCurrencyAvailableGet(
    currency,
    authorization
  );
};

export const fetchWalletTransactions = (requestFilters?: FilteringType) =>
  actions.fetchWalletTransactionsDispatch(
    authService.getAuthArg(),
    requestFilters
  );

export const offPayFeesWithGvt = () =>
  walletApi.v10WalletPaygvtfeeOffPost(authService.getAuthArg());

export const onPayFeesWithGvt = () =>
  walletApi.v10WalletPaygvtfeeOnPost(authService.getAuthArg());

export const cancelWithdrawRequest = (txId: string) => (
  dispatch: MiddlewareDispatch
): CancelablePromise<any> =>
  walletApi
    .v10WalletWithdrawRequestCancelByTxIdPost(txId, authService.getAuthArg())
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

export const resendWithdrawRequest = (txId: string) => (
  dispatch: MiddlewareDispatch
): CancelablePromise<any> =>
  walletApi
    .v10WalletWithdrawRequestResendByTxIdPost(txId, authService.getAuthArg())
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

export const fetchMultiTransactions = (
  currency?: CURRENCIES,
  filters?: FilteringType
) => {
  const authorization = authService.getAuthArg();
  const filtering = {
    ...filters,
    currency
  };
  return walletApi
    .v10WalletMultiTransactionsGet(authorization, filtering)
    .then(mapToTableItems("transactions"));
};

export const fetchCopytradingAccounts = () =>
  signalApi
    .v10SignalAccountsGet(authService.getAuthArg())
    .then(mapToTableItems<CopyTradingAccountInfo>("accounts"));
