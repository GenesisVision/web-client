import walletApi from "shared/services/api-client/wallet-api";
import authService from "shared/services/auth-service";

export const WALLET_BALANCE = "WALLET_BALANCE";
export const WALLET_TRANSACTIONS = "WALLET_TRANSACTIONS";
export const WALLET_TRANSACTIONS_FILTERS = "WALLET_TRANSACTIONS_FILTERS";

export const fetchWallets = (currentCurrency, authorization) => ({
  type: WALLET_BALANCE,
  payload: walletApi.v10WalletMultiByCurrencyGet(currentCurrency, authorization)
});

export const fetchWalletTransactionsDispatch = (authorization, filters) => ({
  type: WALLET_TRANSACTIONS,
  payload: walletApi.v10WalletTransactionsGet(authorization, filters)
});

export const fetchWalletTransactions = (authorization, filters) =>
  walletApi.v10WalletTransactionsGet(authorization, filters);

export const fetchWalletTransactionsFilters = filters => ({
  type: WALLET_TRANSACTIONS_FILTERS,
  payload: walletApi.v10WalletMultiFiltersGet(authService.getAuthArg())
});
