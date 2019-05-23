import { Dispatch } from "redux";
import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";
import managerApi from "shared/services/api-client/manager-api";
import authService from "shared/services/auth-service";

export const programEditSignal = (
  id: string,
  successFee: number,
  volumeFee: number
): any => (dispatch: Dispatch) => {
  const authorization = authService.getAuthArg();
  const requestData = {
    programId: id,
    successFee,
    volumeFee
  };
  return managerApi
    .v10ManagerSignalEditPost(authorization, requestData)
    .then(() => {
      dispatch(
        alertMessageActions.success(
          "manager.program-edit-signal.success-alert-message",
          true
        )
      );
      return;
    });
};
