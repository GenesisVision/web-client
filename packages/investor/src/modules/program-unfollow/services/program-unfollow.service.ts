import { ErrorMessage } from "gv-api-web";
import { Dispatch } from "redux";
import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";
import signalApi from "shared/services/api-client/signal-api";
import authService from "shared/services/auth-service";

export const detachToSignal = (programId: string, onSuccess: () => void) => (
  dispatch: Dispatch
) => {
  const authorization = authService.getAuthArg();
  return signalApi
    .v10SignalDetachByIdPost(programId, authorization)
    .then(() => {
      onSuccess();
      dispatch(
        alertMessageActions.success(
          "program-details-page.close-period.notification-success",
          true
        )
      );
    })
    .catch((error: ErrorMessage) => {
      dispatch(alertMessageActions.error(error.message));
    });
};
