import walletApi from "services/api-client/wallet-api";
import authService from "services/auth-service";

export const cancelWithdrawalRequestMethod = (id: string) =>
  walletApi.cancelWithdrawalRequest(id, authService.getAuthArg());

export const resendWithdrawalRequestEmailMethod = (id: string) =>
  walletApi.resendWithdrawalRequestEmail(id, authService.getAuthArg());
