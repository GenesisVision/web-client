import { WalletMultiSummary, WalletTransactionsViewModel } from "gv-api-web";
import { FilteringType } from "shared/components/table/components/filtering/filter.type";
import walletApi from "shared/services/api-client/wallet-api";
import { ActionType, ApiAction } from "shared/utils/types";

export const WALLET_BALANCE = "WALLET_BALANCE";
export const WALLET_TRANSACTIONS = "WALLET_TRANSACTIONS";
export const WALLET_LAST_UPDATE = "WALLET_LAST_UPDATE";

interface FetchWalletAction extends ApiAction<WalletMultiSummary> {
  type: typeof WALLET_BALANCE;
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

export const fetchWalletTransactionsDispatch = (
  authorization: string,
  filters?: FilteringType
): FetchTransactionsAction => ({
  type: WALLET_TRANSACTIONS,
  payload: walletApi.v10WalletTransactionsGet(authorization, filters)
});

export const updateWalletTimestamp = (): UpdateTimestampAction => ({
  type: WALLET_LAST_UPDATE,
  payload: new Date()
});
