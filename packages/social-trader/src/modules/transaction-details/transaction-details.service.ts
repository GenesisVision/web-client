import walletApi from "services/api-client/wallet-api";
import authService from "shared/services/auth-service";

export const getTransactionDetailsMethod = (id: string) => Promise.resolve(); //walletApi.getTransactionDetailsMethod(id, authService.getAuthArg());

export const cancelWithdrawalRequestMethod = (id: string) =>
  walletApi.cancelWithdrawalRequest(id, authService.getAuthArg());

export const resendWithdrawalRequestEmailMethod = (id: string) =>
  walletApi.resendWithdrawalRequestEmail(id, authService.getAuthArg());
