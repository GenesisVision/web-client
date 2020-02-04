import { FilteringType } from "components/table/components/filtering/filter.type";
import {
  Currency,
  ItemsViewModelTransactionViewModel,
  WalletBaseData
} from "gv-api-web";
import { NextPageContext } from "next";
import walletApi from "services/api-client/wallet-api";
import authService from "services/auth-service";
import { CurrencyEnum, RootThunk } from "utils/types";

import * as actions from "../actions/wallet.actions";

export const fetchWalletsWithCtx = (
  ctx?: NextPageContext
): RootThunk<void> => async (dispatch, getState) => {
  const authorization = authService.getAuthArg(ctx);
  const { info } = getState().wallet;
  if (info.isPending) return;
  const { currency } = getState().accountSettings;
  await dispatch(actions.updateWalletTimestampAction());
  await dispatch(actions.fetchWalletsAction(currency, authorization));
};

export const fetchWallets = (
  currency: CurrencyEnum,
  ctx?: NextPageContext
): RootThunk<void> => async dispatch => {
  const authorization = authService.getAuthArg(ctx);
  await dispatch(actions.updateWalletTimestampAction());
  await dispatch(actions.fetchWalletsAction(currency, authorization));
};

export type TWalletsAvailableData = WalletBaseData[];
export const fetchAvailableWallets = ({
  currency
}: {
  currency: CurrencyEnum;
}): Promise<TWalletsAvailableData> => {
  const authorization = authService.getAuthArg();
  return walletApi
    .getWalletAvailable(currency, authorization)
    .then(({ wallets }) => wallets);
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
): Promise<ItemsViewModelTransactionViewModel> => {
  const authorization = authService.getAuthArg();

  return walletApi.getTransactionsInternal(authorization, {
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
): Promise<ItemsViewModelTransactionViewModel> => {
  const authorization = authService.getAuthArg();
  return walletApi.getTransactionsExternal(authorization, {
    ...filters,
    currency
  });
};
