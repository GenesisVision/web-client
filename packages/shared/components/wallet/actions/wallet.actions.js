import walletApi from "shared/services/api-client/wallet-api";

export const WALLET_BALANCE = "WALLET_BALANCE";
export const WALLET_TRANSACTIONS = "WALLET_TRANSACTIONS";
export const WALLET_TRANSACTIONS_FILTERS = "WALLET_TRANSACTIONS_FILTERS";

export const updateWalletBalance = wallet => ({
  type: WALLET_BALANCE,
  wallet
});

export const fetchWalletTransactionsDispatch = (authorization, filters) => ({
  type: WALLET_TRANSACTIONS,
  payload: walletApi.v10WalletTransactionsGet(authorization, filters)
});

export const fetchWalletTransactions = (authorization, filters) =>
  walletApi.v10WalletTransactionsGet(authorization, filters);

export const updateWalletTransactionsFilters = filters => ({
  type: WALLET_TRANSACTIONS_FILTERS,
  payload: filters
});
