import { CancelablePromise } from "gv-api-web";
import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";
import managerApi from "shared/services/api-client/manager-api";
import authService from "shared/services/auth-service";
import { ManagerThunk, ResponseError } from "shared/utils/types";

export const changeBrokerMethod = (
  programId: string,
  newBrokerAccountTypeId: string,
  newLeverage: number
): ManagerThunk<CancelablePromise<void>> => dispatch =>
  managerApi
    .v10ManagerProgramsBrokerChangePost(authService.getAuthArg(), {
      request: { programId, newBrokerAccountTypeId, newLeverage }
    })
    .then(() => {
      dispatch(
        alertMessageActions.success(
          "manager.program-settings.notifications.broker-success",
          true
        )
      );
    })
    .catch((error: ResponseError) => {
      dispatch(alertMessageActions.error(error.errorMessage));
    });
