import { push } from "connected-react-router";
import { Dispatch } from "redux";
import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";
import { PROGRAMS_ROUTE } from "shared/routes/programs.routes";
import walletApi from "shared/services/api-client/wallet-api";
import { ActionType } from "shared/utils/types";

export const confirmWithdraw = (requestId?: string, code?: string) => (
  dispatch: Dispatch<ActionType>
): Promise<any> =>
  walletApi
    .confirmWithdrawalRequestByCode({
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
