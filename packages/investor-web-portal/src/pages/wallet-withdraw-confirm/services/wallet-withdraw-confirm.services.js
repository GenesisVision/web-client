import { PROGRAMS_ROUTE } from "pages/programs/programs.routes";
import { push } from "react-router-redux";
import { walletApiProxy } from "services/api-client/wallet-api";
import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";

export const confirmWithdraw = (requestId, code) => dispatch => {
  return walletApiProxy
    .v10WalletWithdrawRequestConfirmPost({
      requestId,
      code
    })
    .then(response => {
      dispatch(push(PROGRAMS_ROUTE));
      dispatch(
        alertMessageActions.success(
          "wallet-withdraw.confirmation.success",
          true
        )
      );
      return response;
    })
    .catch(error => {
      dispatch(push(PROGRAMS_ROUTE));
      dispatch(alertMessageActions.error(error.errorMessage));
    });
};
