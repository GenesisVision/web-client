import { PROGRAMS_ROUTE } from "pages/programs/programs.routes";
import { push } from "react-router-redux";
import { walletApiProxy } from "services/api-client/wallet-api";

export const confirmWithdraw = (requestId, code) => dispatch => {
  return walletApiProxy
    .v10WalletWithdrawRequestConfirmPost({
      requestId,
      code
    })
    .then(response => {
      dispatch(push(PROGRAMS_ROUTE));
      return response;
    });
};
