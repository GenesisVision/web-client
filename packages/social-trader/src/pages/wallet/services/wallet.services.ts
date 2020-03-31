import { FilteringType } from "components/table/components/filtering/filter.type";
import {
  Currency,
  TransactionViewModelItemsViewModel,
  WalletBaseData
} from "gv-api-web";
import { api } from "services/api-client/swagger-custom-client";
import { getAccountCurrency } from "utils/account-currency";
import { CurrencyEnum, NextPageWithReduxContext, RootThunk } from "utils/types";

import * as actions from "../actions/wallet.actions";

export const fetchWalletsWithCtx = (
  ctx?: NextPageWithReduxContext
): RootThunk<void> => async (dispatch, getState) => {
  const { info } = getState().wallet;
  if (info.isPending) return;
  const currency = getAccountCurrency(ctx);
  await dispatch(actions.updateWalletTimestampAction());
  await dispatch(actions.fetchWalletsAction(currency, ctx?.token));
};

export const fetchWallets = (
  currency: CurrencyEnum,
  ctx?: NextPageWithReduxContext
): RootThunk<void> => async dispatch => {
  await dispatch(actions.updateWalletTimestampAction());
  await dispatch(actions.fetchWalletsAction(currency, ctx?.token));
};

export type TWalletsAvailableData = WalletBaseData[];
export const fetchAvailableWallets = ({
  currency
}: {
  currency: CurrencyEnum;
}): Promise<TWalletsAvailableData> => {
  return api
    .wallet()
    .getWalletAvailable(currency)
    .then(({ wallets }) => wallets);
};

export const fetchWalletTransactions = (requestFilters?: FilteringType) =>
  actions.fetchWalletTransactionsAction(requestFilters);

export const offPayFeesWithGvt = () => api.wallet().switchPayFeeInGvtOff();

export const onPayFeesWithGvt = () => api.wallet().switchPayFeeInGvtOn();

export type FetchTransactionsInternalFilterType = {
  transactionType?:
    | "All"
    | "Investment"
    | "Withdrawal"
    | "Conversion"
    | "Commission"
    | "Program"
    | "Fund"
    | "Follow"
    | "TradingAccounts"
    | "AgentReward";
  dateFrom?: Date;
  dateTo?: Date;
  currency?: Currency;
  skip?: number;
  take?: number;
};

export const fetchMultiTransactions = (
  currency?: CurrencyEnum,
  filters?: FetchTransactionsInternalFilterType
): Promise<TransactionViewModelItemsViewModel> => {
  return api.wallet().getTransactionsInternal({
    ...filters,
    currency
  });
};

export type FetchTransactionsExternalFilterType = {
  transactionType?: "All" | "Withdrawal" | "Deposit" | "Platform";
  dateFrom?: Date;
  dateTo?: Date;
  skip?: number;
  take?: number;
};

export const fetchMultiTransactionsExternal = (
  currency?: CurrencyEnum,
  filters?: FetchTransactionsExternalFilterType
): Promise<TransactionViewModelItemsViewModel> => {
  return api.wallet().getTransactionsExternal({
    ...filters,
    currency
  });
};
