import { FilteringType } from "components/table/components/filtering/filter.type";
import { Currency, WalletSummary } from "gv-api-web";
import { WalletsAvailableStateType } from "pages/wallet/reducers/wallet.reducers";
import { fetchAvailableWallets } from "pages/wallet/services/wallet.services";
import { api, Token } from "services/api-client/swagger-custom-client";
import walletApi from "services/api-client/wallet-api";
import { ActionType, ApiAction, CurrencyEnum } from "utils/types";

import { WalletLastUpdateState } from "../reducers/wallet-last-update";

export const WALLET_BALANCE = "WALLET_BALANCE";
export const WALLET_BALANCE_BY_CURRENCY_AVAILABLE =
  "WALLET_BALANCE_BY_CURRENCY_AVAILABLE";
export const WALLET_TRANSACTIONS = "WALLET_TRANSACTIONS";
export const WALLET_LAST_UPDATE = "WALLET_LAST_UPDATE";
export const ACCOUNT_LAST_UPDATE = "ACCOUNT_LAST_UPDATE";

interface FetchWalletAction extends ApiAction<WalletSummary> {
  type: typeof WALLET_BALANCE;
}

interface FetchWalletByCurrencyAction
  extends ApiAction<WalletsAvailableStateType> {
  type: typeof WALLET_BALANCE_BY_CURRENCY_AVAILABLE;
}

interface FetchTransactionsAction extends ApiAction {
  // TODO declare ApiAction type
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
  token: Token
): FetchWalletAction => {
  return {
    type: WALLET_BALANCE,
    payload: api.wallet(token).getWalletSummary(currency)
  };
};

export const fetchWalletsByCurrencyAvailableAction = (
  currency: CurrencyEnum
): FetchWalletByCurrencyAction => ({
  type: WALLET_BALANCE_BY_CURRENCY_AVAILABLE,
  payload: fetchAvailableWallets({ currency })
});

export const fetchWalletTransactionsAction = (
  filters?: FilteringType
): FetchTransactionsAction => ({
  type: WALLET_TRANSACTIONS,
  payload: walletApi.getTransactionsInternal(filters)
});

export const updateWalletTimestampAction = (): UpdateTimestampAction => ({
  type: WALLET_LAST_UPDATE,
  payload: { timestamp: new Date() }
});

export const updateAccountTimestampAction = (): UpdateAccountTimestampAction => ({
  type: ACCOUNT_LAST_UPDATE,
  payload: new Date()
});
