import { FUND, PROGRAM } from "shared/constants/constants";
import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";
import managerApi from "shared/services/api-client/manager-api";
import authService from "shared/services/auth-service";
import filesService from "shared/services/file-service";
import { IConfirmFormValues } from "../components/confirm-form";
import { Dispatch } from "redux";
import { CancelablePromise, TwoFactorAuthenticator } from "gv-api-web";
import { IConfirmProgramProps } from "../confirm-container";

export const confirm = (values: IConfirmFormValues & IConfirmProgramProps) => (
  dispatch: Dispatch
): CancelablePromise<any> => {
  const authorization = authService.getAuthArg();
  return managerApi.v10ManagerPrograms2faConfirmPost(authorization, values);
};
export const get2faInfo = IConfirmProgramProps => (
  dispatch: Dispatch
): CancelablePromise<TwoFactorAuthenticator> => {
  const authorization = authService.getAuthArg();
  return managerApi.v10ManagerPrograms2faGetGet(authorization, values);
};

export interface IConfitmService {
  confirm: (
    values: IConfirmFormValues & IConfirmProgramProps
  ) => (dispatch: Dispatch) => CancelablePromise<any>;
  get2faInfo: (
    values: IConfirmFormValues & IConfirmProgramProps
  ) => (dispatch: Dispatch) => CancelablePromise<TwoFactorAuthenticator>;
}
