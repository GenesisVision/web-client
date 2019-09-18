import {
  CancelablePromise,
  CopyTradingAccountInfo,
  MultiWalletExternalTransaction,
  WalletBaseData
} from "gv-api-web";
import { NextPageContext } from "next";
import { FilteringType } from "shared/components/table/components/filtering/filter.type";
import {
  TableItems,
  mapToTableItems
} from "shared/components/table/helpers/mapper";
import { CURRENCIES } from "shared/modules/currency-select/currency-select.constants";
import signalApi from "shared/services/api-client/signal-api";
import walletApi from "shared/services/api-client/wallet-api";
import authService from "shared/services/auth-service";
import { CurrencyEnum, RootThunk } from "shared/utils/types";

import * as actions from "../actions/wallet.actions";

export const fetchWallets = (currency: CurrencyEnum, ctx?: NextPageContext): RootThunk<void> => async (
  dispatch
) => {
  const authorization = authService.getAuthArg(ctx);
  await dispatch(actions.updateWalletTimestampAction());
  await dispatch(actions.fetchWalletsAction(currency, authorization));
};

export const fetchAccounts = (ctx?: NextPageContext): RootThunk<void> => async (
  dispatch
) => {
  const authorization = authService.getAuthArg(ctx);
  await dispatch(actions.updateAccountTimestampAction());
  await dispatch(actions.fetchAccountsAction(authorization));
};

export const fetchBaseWallets = (): RootThunk<Promise<WalletBaseData[]>> => (
  dispatch,
  getState
) => {
  const authorization = authService.getAuthArg();
  const { currency } = getState().accountSettings;
  return walletApi
    .v10WalletMultiByCurrencyAvailableGet(currency, authorization)
    .then(res => res.wallets);
};

export const fetchWalletTransactions = (requestFilters?: FilteringType) =>
  actions.fetchWalletTransactionsAction(
    authService.getAuthArg(),
    requestFilters
  );

export const offPayFeesWithGvt = () =>
  walletApi.v10WalletPaygvtfeeOffPost(authService.getAuthArg());

export const onPayFeesWithGvt = () =>
  walletApi.v10WalletPaygvtfeeOnPost(authService.getAuthArg());

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

export const fetchMultiTransactionsExternal = (
  currency?: string,
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
