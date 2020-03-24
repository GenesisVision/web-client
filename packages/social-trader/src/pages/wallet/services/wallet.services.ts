import { FilteringType } from "components/table/components/filtering/filter.type";
import {
  Currency,
  TransactionViewModelItemsViewModel,
  WalletBaseData
} from "gv-api-web";
import { NextPageContext } from "next";
import { Token } from "services/api-client/swagger-custom-client";
import walletApi from "services/api-client/wallet-api";
import { CurrencyEnum, RootThunk } from "utils/types";

import * as actions from "../actions/wallet.actions";

export const fetchWalletsWithCtx = (
  ctx?: NextPageContext
): RootThunk<void> => async (dispatch, getState) => {
  const { info } = getState().wallet;
  if (info.isPending) return;
  const { currency } = getState().accountSettings;
  await dispatch(actions.updateWalletTimestampAction());
  await dispatch(actions.fetchWalletsAction(currency, Token.create(ctx)));
};

export const fetchWallets = (
  currency: CurrencyEnum,
  ctx?: NextPageContext
): RootThunk<void> => async dispatch => {
  await dispatch(actions.updateWalletTimestampAction());
  await dispatch(actions.fetchWalletsAction(currency, Token.create(ctx)));
};

export type TWalletsAvailableData = WalletBaseData[];
export const fetchAvailableWallets = ({
  currency
}: {
  currency: CurrencyEnum;
}): Promise<TWalletsAvailableData> => {
  return walletApi.getWalletAvailable(currency).then(({ wallets }) => wallets);
};

export const fetchWalletTransactions = (requestFilters?: FilteringType) =>
  actions.fetchWalletTransactionsAction(requestFilters);

export const offPayFeesWithGvt = () => walletApi.switchPayFeeInGvtOff();

export const onPayFeesWithGvt = () => walletApi.switchPayFeeInGvtOn();

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
  return walletApi.getTransactionsInternal({
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
  return walletApi.getTransactionsExternal({
    ...filters,
    currency
  });
};
