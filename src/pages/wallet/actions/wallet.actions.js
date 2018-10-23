import walletApi from "services/api-client/wallet-api";

export const WALLET_BALANCE = "WALLET_BALANCE";
export const WALLET_TRANSACTIONS = "WALLET_TRANSACTIONS";
export const WALLET_TRANSACTIONS_FILTERS = "WALLET_TRANSACTIONS_FILTERS";

export const fetchWalletBalance = (currentCurrency, authorization) => ({
  type: WALLET_BALANCE,
  payload: walletApi.v10WalletByCurrencyGet(currentCurrency, authorization)
});

export const fetchWalletTransactions = (authorization, filters) => ({
  type: WALLET_TRANSACTIONS,
  payload: walletApi.v10WalletTransactionsGet(authorization, filters)
});

export const updateWalletTransactionsFilters = filters => ({
  type: WALLET_TRANSACTIONS_FILTERS,
  payload: filters
});
