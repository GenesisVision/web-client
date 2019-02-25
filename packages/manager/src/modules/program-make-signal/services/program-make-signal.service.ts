import { Dispatch } from "redux";
import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";
import managerApi from "shared/services/api-client/manager-api";
import authService from "shared/services/auth-service";

export interface IProgramMakeSignalRequest {
  programId: string;
  subscriptionFee: number;
  successFee: number;
}

export const programMakeSignal = (
  id: string,
  successFee: number,
  subscriptionFee: number
): any => (dispatch: Dispatch) => {
  const authorization = authService.getAuthArg();
  const requestData = {
    programId: id,
    successFee: successFee,
    subscriptionFee: subscriptionFee
  };
  return managerApi
    .v10ManagerSignalCreatePost(authorization, requestData)
    .then(() => {
      dispatch(
        alertMessageActions.success(
          "manager.program-make-signal.success-alert-message",
          true
        )
      );
      return;
    });
};
