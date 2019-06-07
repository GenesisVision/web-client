import {
  CopyTradingAccountsList,
  WalletMultiAvailable,
  WalletMultiSummary,
  WalletTransactionsViewModel
} from "gv-api-web";
import { FilteringType } from "shared/components/table/components/filtering/filter.type";
import signalApi from "shared/services/api-client/signal-api";
import walletApi from "shared/services/api-client/wallet-api";
import authService from "shared/services/auth-service";
import { ActionType, ApiAction } from "shared/utils/types";

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
  extends ApiAction<WalletTransactionsViewModel> {
  type: typeof WALLET_TRANSACTIONS;
}

interface UpdateTimestampAction extends ActionType<Date> {
  type: typeof WALLET_LAST_UPDATE;
}

interface UpdateAccountTimestampAction extends ActionType<Date> {
  type: typeof ACCOUNT_LAST_UPDATE;
}

export const fetchWalletsAction = (
  currency: string,
  authorization: string
): FetchWalletAction => ({
  type: WALLET_BALANCE,
  payload: walletApi.v10WalletMultiByCurrencyGet(currency, authorization)
});

export const fetchAccountsAction = (authorization: string): FetchAccountsAction => ({
  type: COPYTRADING_ACCOUNTS,
  payload: signalApi.v10SignalAccountsGet(authorization)
});

export const fetchWalletsByCurrencyAvailableAction = (
  currency: string
): FetchWalletByCurrencyAction => ({
  type: WALLET_BALANCE_BY_CURRENCY_AVAILABLE,
  payload: walletApi.v10WalletMultiByCurrencyAvailableGet(
    currency,
    authService.getAuthArg()
  )
});

export const fetchWalletTransactionsAction = (
  authorization: string,
  filters?: FilteringType
): FetchTransactionsAction => ({
  type: WALLET_TRANSACTIONS,
  payload: walletApi.v10WalletTransactionsGet(authorization, filters)
});

export const updateWalletTimestampAction = (): UpdateTimestampAction => ({
  type: WALLET_LAST_UPDATE,
  payload: new Date()
});

export const updateAccountTimestampAction = (): UpdateAccountTimestampAction => ({
  type: ACCOUNT_LAST_UPDATE,
  payload: new Date()
});
