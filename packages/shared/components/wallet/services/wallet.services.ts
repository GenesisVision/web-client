import {
  CancelablePromise,
  CopyTradingAccountInfo,
  MultiWalletExternalTransaction
} from "gv-api-web";
import { FilteringType } from "shared/components/table/components/filtering/filter.type";
import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";
import signalApi from "shared/services/api-client/signal-api";
import walletApi from "shared/services/api-client/wallet-api";
import authService from "shared/services/auth-service";
import { RootThunk } from "shared/utils/types";

import { TableItems, mapToTableItems } from "../../table/helpers/mapper";
import * as actions from "../actions/wallet.actions";

export const fetchWallets = (): RootThunk<void> => (dispatch, getState) => {
  const authorization = authService.getAuthArg();
  const { info } = getState().wallet;
  if (info.isPending) return;
  const { currency } = getState().accountSettings;
  dispatch(actions.updateWalletTimestamp());
  dispatch(actions.fetchWallets(currency, authorization));
};

export const fetchWalletTransactions = (requestFilters?: FilteringType) => {
  const authorization = authService.getAuthArg();

  return actions.fetchWalletTransactionsDispatch(authorization, requestFilters);
};

export const offPayFeesWithGvt = () => () => {
  return walletApi.v10WalletPaygvtfeeOffPost(authService.getAuthArg());
};

export const onPayFeesWithGvt = () => () => {
  return walletApi.v10WalletPaygvtfeeOnPost(authService.getAuthArg());
};

export const cancelWithdrawRequest = (
  txId: string
): RootThunk<any> => dispatch => {
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

export const resendWithdrawRequest = (txId: string): RootThunk<any> => (
  dispatch,
  getState
) => {
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

export const fetchMultiTransactionsExternal = (
  currency: string,
  filters?: FilteringType
): CancelablePromise<TableItems<MultiWalletExternalTransaction>> => {
  const authorization = authService.getAuthArg();
  const filtering = {
    ...filters,
    currency
  };
  return walletApi
    .v10WalletMultiTransactionsExternalGet(authorization, filtering)
    .then(mapToTableItems<MultiWalletExternalTransaction>("transactions"));
};

export const fetchMultiTransactions = (
  currency: string,
  filters: FilteringType
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

export const fetchCopytradingAccounts = () => {
  const authorization = authService.getAuthArg();
  return signalApi
    .v10SignalAccountsGet(authorization)
    .then(data => ({ ...mockCopytrading, total: 0 }))
    .then(mapToTableItems<CopyTradingAccountInfo>("accounts"));
};

let mockCopytrading = {
  accounts: [
    {
      currency: "GVT",
      logo: "d3d2bc3e-eb20-4941-91e7-c8af00d0efe7",
      balance: 100,
      equity: 10,
      freeMargin: 90
    }
  ]
};
