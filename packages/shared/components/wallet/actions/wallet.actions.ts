import {
  WalletMultiAvailable,
  WalletMultiSummary,
  WalletTransactionsViewModel
} from "gv-api-web";
import walletApi from "shared/services/api-client/wallet-api";
import authService from "shared/services/auth-service";
import { ActionType, ApiAction } from "shared/utils/types";

export const WALLET_BALANCE = "WALLET_BALANCE";
export const WALLET_BALANCE_BY_CURRENCY_AVAILABLE =
  "WALLET_BALANCE_BY_CURRENCY_AVAILABLE";
export const WALLET_TRANSACTIONS = "WALLET_TRANSACTIONS";
export const WALLET_LAST_UPDATE = "WALLET_LAST_UPDATE";

interface FetchWalletAction extends ApiAction<WalletMultiSummary> {
  type: typeof WALLET_BALANCE;
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

export const fetchWallets = (
  currency: string,
  authorization: string
): FetchWalletAction => ({
  type: WALLET_BALANCE,
  payload: walletApi.v10WalletMultiByCurrencyGet(currency, authorization)
});

export const fetchWalletsByCurrencyAvailable = (
  currency: string
): FetchWalletByCurrencyAction => ({
  type: WALLET_BALANCE_BY_CURRENCY_AVAILABLE,
  payload: walletApi.v10WalletMultiByCurrencyAvailableGet(
    currency,
    authService.getAuthArg()
  )
});

export const fetchWalletTransactionsDispatch = (
  authorization: string,
  filters?: any
): FetchTransactionsAction => ({
  type: WALLET_TRANSACTIONS,
  payload: walletApi.v10WalletTransactionsGet(authorization, filters)
});

export const updateWalletTimestamp = (): UpdateTimestampAction => ({
  type: WALLET_LAST_UPDATE,
  payload: new Date()
});
