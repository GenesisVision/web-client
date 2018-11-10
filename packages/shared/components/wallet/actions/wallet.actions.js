import walletApi from "services/api-client/wallet-api";

export const WALLET_BALANCE = "WALLET_BALANCE";

export const fetchWalletBalance = (currentCurrency, authorization) => ({
  type: WALLET_BALANCE,
  payload: walletApi.v10WalletByCurrencyGet(currentCurrency, authorization)
});
