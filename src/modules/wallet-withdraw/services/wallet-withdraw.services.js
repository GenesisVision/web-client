import { walletApiProxy } from "services/api-client/wallet-api";
import authService from "services/auth-service";

export const fetchPaymentInfo = () => {
  return walletApiProxy.v10WalletWithdrawInfoGet(authService.getAuthArg());
};

export const newWithdrawRequest = data => {
  return walletApiProxy
    .v10WalletWithdrawRequestNewPost(authService.getAuthArg(), { model: data })
    .catch(error => error);
};
