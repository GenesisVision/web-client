import { CancelablePromise, TwoFactorAuthenticator } from "gv-api-web";
import managerApi from "shared/services/api-client/manager-api";
import authService from "shared/services/auth-service";

import { IConfirmFormValues } from "../components/confirm-form";
import { IConfirmProgramProps } from "../confirm-container";

export const confirm = (
  values: IConfirmFormValues & IConfirmProgramProps
): CancelablePromise<any> => {
  const authorization = authService.getAuthArg();
  return managerApi.confirmProgram2FA(authorization, values);
};
export const get2faInfo = (
  values: IConfirmProgramProps
): CancelablePromise<TwoFactorAuthenticator> => {
  const authorization = authService.getAuthArg();
  return managerApi.getProgram2FA(authorization, values);
};

export interface IConfitmService {
  confirm: (
    values: IConfirmFormValues & IConfirmProgramProps
  ) => CancelablePromise<any>;
  get2faInfo: (
    values: IConfirmProgramProps
  ) => CancelablePromise<TwoFactorAuthenticator>;
}
