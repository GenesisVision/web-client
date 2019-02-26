import walletApi from "shared/services/api-client/wallet-api";

export const WALLET_BALANCE = "WALLET_BALANCE";
export const WALLET_TRANSACTIONS = "WALLET_TRANSACTIONS";

export const fetchWallets = (currentCurrency, authorization) => ({
  type: WALLET_BALANCE,
  payload: walletApi.v10WalletMultiByCurrencyGet(currentCurrency, authorization)
});

export const fetchWalletTransactionsDispatch = (authorization, filters) => ({
  type: WALLET_TRANSACTIONS,
  payload: walletApi.v10WalletTransactionsGet(authorization, filters)
});
