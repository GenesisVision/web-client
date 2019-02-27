import { fetchWalletTransactions } from "shared/components/wallet/services/wallet.services";
import walletApi from "shared/services/api-client/wallet-api";
import authService from "shared/services/auth-service";

export const fetchPaymentInfo = () => {
  return walletApi.v10WalletWithdrawInfoGet(authService.getAuthArg());
};

export const newWithdrawRequest = data => (dispatch, getState) => {
  return walletApi
    .v10WalletWithdrawRequestNewPost(authService.getAuthArg(), { model: data })
    .then(response => {
      dispatch(fetchWalletTransactions());
      return response;
    });
};

//@todo возможно нужно перенести в services of wallet-transfer
export const walletTransferRequest = data => {
  return walletApi.v10WalletTransferPost(authService.getAuthArg(), {
    request: {
      ...data,
      sourceType: "Wallet",
      destinationType: "Wallet"
    }
  });
};
