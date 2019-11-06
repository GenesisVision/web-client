// import { ProgramPwdUpdate } from "gv-api-web";
import { Dispatch } from "redux";
import { fetchProfileHeaderInfoAction } from "shared/components/header/actions/header-actions";
import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";
// import managerApi from "shared/services/api-client/manager-api";
import authService from "shared/services/auth-service";
import { CancelablePromise } from "gv-api-web";

export const changePasswordTradingAccount = ({
  id,
  model
}: {
  id: string;
  model?: any;
}): any => (dispatch: Dispatch) => {
  const authorization = authService.getAuthArg();
  new CancelablePromise<void>(() => {});
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
