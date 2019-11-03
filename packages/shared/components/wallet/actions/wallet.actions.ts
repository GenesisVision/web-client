import {
  CopyTradingAccountsList, Currency,
  MultiWalletTransactionsViewModel,
  WalletMultiAvailable,
  WalletMultiSummary
} from "gv-api-web";
import { FilteringType } from "shared/components/table/components/filtering/filter.type";
import walletApi from "shared/services/api-client/wallet-api";
import authService from "shared/services/auth-service";
import { ActionType, ApiAction } from "shared/utils/types";

import { WalletLastUpdateState } from "../reducers/wallet-last-update";

export const COPYTRADING_ACCOUNTS = "COPYTRADING_ACCOUNTS";
export const WALLET_BALANCE = "WALLET_BALANCE";
export const WALLET_BALANCE_BY_CURRENCY_AVAILABLE =
  "WALLET_BALANCE_BY_CURRENCY_AVAILABLE";
export const WALLET_TRANSACTIONS = "WALLET_TRANSACTIONS";
export const WALLET_LAST_UPDATE = "WALLET_LAST_UPDATE";
export const ACCOUNT_LAST_UPDATE = "ACCOUNT_LAST_UPDATE";

interface FetchWalletAction extends ApiAction<WalletMultiSummary> {
  type: typeof WALLET_BALANCE;
}

interface FetchAccountsAction extends ApiAction<CopyTradingAccountsList> {
  type: typeof COPYTRADING_ACCOUNTS;
}

interface FetchWalletByCurrencyAction extends ApiAction<WalletMultiAvailable> {
  type: typeof WALLET_BALANCE_BY_CURRENCY_AVAILABLE;
}

interface FetchTransactionsAction
  extends ApiAction<MultiWalletTransactionsViewModel> {
  type: typeof WALLET_TRANSACTIONS;
}

export interface UpdateTimestampAction
  extends ActionType<WalletLastUpdateState> {
  type: typeof WALLET_LAST_UPDATE;
}

interface UpdateAccountTimestampAction extends ActionType<Date> {
  type: typeof ACCOUNT_LAST_UPDATE;
}

export const fetchWalletsAction = (
  currency: Currency,
  authorization: string
): FetchWalletAction => ({
  type: WALLET_BALANCE,
  payload: walletApi.getWalletSummary(currency, authorization)
});

export const fetchWalletsByCurrencyAvailableAction = (
  currency: string
): FetchWalletByCurrencyAction => ({
  type: WALLET_BALANCE_BY_CURRENCY_AVAILABLE,
  payload: walletApi.getWalletMultiAvailable(currency, authService.getAuthArg())
});

export const fetchWalletTransactionsAction = (
  authorization: string,
  filters?: FilteringType
): FetchTransactionsAction => ({
  type: WALLET_TRANSACTIONS,
  payload: walletApi.getMultiWalletTransactions(authorization, filters)
});

export const updateWalletTimestampAction = (): UpdateTimestampAction => ({
  type: WALLET_LAST_UPDATE,
  payload: { timestamp: new Date() }
});

export const updateAccountTimestampAction = (): UpdateAccountTimestampAction => ({
  type: ACCOUNT_LAST_UPDATE,
  payload: new Date()
});
