import { CopyTradingAccountInfo } from "gv-api-web";
import { fetchProfileHeaderInfo } from "shared/components/header/actions/header-actions";
import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";
import signalApi from "shared/services/api-client/signal-api";
import walletApi from "shared/services/api-client/wallet-api";
import authService from "shared/services/auth-service";

import { mapToTableItems } from "../../table/helpers/mapper";
import * as actions from "../actions/wallet.actions";

export const fetchWallets = () => (dispatch, getState) => {
  const authorization = authService.getAuthArg();
  const { info } = getState().wallet;
  if (info.isPending) return;
  const { currency } = getState().accountSettings;

  dispatch(actions.fetchWallets(currency, authorization));
  dispatch(fetchProfileHeaderInfo());
};

export const fetchWalletTransactions = requestFilters => {
  const authorization = authService.getAuthArg();

  return actions.fetchWalletTransactionsDispatch(authorization, requestFilters);
};

export const offPayFeesWithGvt = () => () => {
  return walletApi.v10WalletPaygvtfeeOffPost(authService.getAuthArg());
};

export const onPayFeesWithGvt = () => () => {
  return walletApi.v10WalletPaygvtfeeOnPost(authService.getAuthArg());
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

export const fetchMultiTransactionsExternal = (
  currency: string,
  filters: any
) => {
  const authorization = authService.getAuthArg();
  const filtering = {
    ...filters,
    currency
  };
  return walletApi
    .v10WalletMultiTransactionsExternalGet(authorization, filtering)
    .then(mapToTableItems("transactions"));
};

export const fetchMultiTransactions = (currency: string, filters: any) => {
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
    .then(mapToTableItems("accounts"));
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
