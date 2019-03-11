import { ProgramPwdUpdate } from "gv-api-web";
import { Dispatch } from "redux";
import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";
import managerApi from "shared/services/api-client/manager-api";
import authService from "shared/services/auth-service";

export interface IchangePasswordTradingAccount {
  id: string;
  opts?: {
    model?: ProgramPwdUpdate;
  };
}

export const changePasswordTradingAccount = ({
  id,
  opts
}: IchangePasswordTradingAccount): any => (dispatch: Dispatch) => {
  const authorization = authService.getAuthArg();
  return managerApi
    .v10ManagerProgramsByIdPasswordChangePost(id, authorization, opts)
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
