import {
  CancelablePromise,
  CopyTradingAccountInfo,
  Currency,
  MultiWalletExternalTransaction,
  WalletBaseData
} from "gv-api-web";
import { FilteringType } from "shared/components/table/components/filtering/filter.type";
import {
  mapToTableItems,
  TableItems
} from "shared/components/table/helpers/mapper";
import signalApi from "shared/services/api-client/signal-api";
import walletApi from "shared/services/api-client/wallet-api";
import authService from "shared/services/auth-service";
import { CurrencyEnum, RootThunk } from "shared/utils/types";

import * as actions from "../actions/wallet.actions";

export const fetchWallets = (
  currency: CurrencyEnum
): RootThunk<void> => dispatch => {
  const authorization = authService.getAuthArg();
  dispatch(actions.updateWalletTimestampAction());
  dispatch(actions.fetchWalletsAction(currency, authorization));
};

export const fetchAccounts = (): RootThunk<void> => dispatch => {
  const authorization = authService.getAuthArg();
  dispatch(actions.updateAccountTimestampAction());
  dispatch(actions.fetchAccountsAction(authorization));
};

export const fetchBaseWallets = (): RootThunk<Promise<WalletBaseData[]>> => (
  dispatch,
  getState
) => {
  const authorization = authService.getAuthArg();
  const { currency } = getState().accountSettings;
  return walletApi
    .getWalletMultiAvailable(currency, authorization)
    .then(res => res.wallets);
};

export const fetchWalletTransactions = (requestFilters?: FilteringType) =>
  actions.fetchWalletTransactionsAction(
    authService.getAuthArg(),
    requestFilters
  );

export const offPayFeesWithGvt = () =>
  walletApi.switchPayFeeInGvtOff(authService.getAuthArg());

export const onPayFeesWithGvt = () =>
  walletApi.switchPayFeeInGvtOn(authService.getAuthArg());

export const fetchMultiTransactions = (
  currency?: Currency,
  filters?: FilteringType
) => {
  const authorization = authService.getAuthArg();
  const filtering = {
    ...filters,
    currency
  };
  return walletApi
    .getMultiWalletTransactions(authorization, filtering)
    .then(mapToTableItems("transactions"));
};

export const fetchCopytradingAccounts = () =>
  signalApi
    .getCopytradingAccounts(authService.getAuthArg())
    .then(mapToTableItems<CopyTradingAccountInfo>("accounts"));

export const fetchMultiTransactionsExternal = (
  currency?: Currency,
  filters?: FilteringType
): CancelablePromise<TableItems<MultiWalletExternalTransaction>> => {
  const authorization = authService.getAuthArg();
  const filtering = {
    ...filters,
    currency
  };
  return walletApi
    .getWalletExternalTransactions(authorization, filtering)
    .then(mapToTableItems<MultiWalletExternalTransaction>("transactions"));
};
