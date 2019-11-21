//import { ProgramPwdUpdate } from "gv-api-web";
import { fetchProfileHeaderInfoAction } from "components/header/actions/header-actions";
import { CancelablePromise } from "gv-api-web";
import { alertMessageActions } from "modules/alert-message/actions/alert-message-actions";
import { Dispatch } from "redux";
// import managerApi from "shared/services/api-client/manager-api";
import authService from "shared/services/auth-service";

export const changePasswordTradingAccount = ({
  id,
  model
}: {
  id: string;
  model?: any;
}): any => (dispatch: Dispatch) => {
  const authorization = authService.getAuthArg();
  return new CancelablePromise<void>(() => {});
  // return managerApi
  //   .changeProgramPassword(id, authorization, { model })
  //   .then(() => {
  //     dispatch(fetchProfileHeaderInfoAction());
  //     dispatch(
  //       alertMessageActions.success(
  //         "password-change-trading-account.success-alert-message",
  //         true
  //       )
  //     );
  //     return;
  //   });
};
