import { CancelablePromise, TwoFactorAuthenticator } from "gv-api-web";
// import managerApi from "shared/services/api-client/manager-api";
import authService from "services/auth-service";

import { IConfirmFormValues } from "../components/confirm-form";
import { IConfirmProgramProps } from "../confirm-container";

export const confirm = (
  values: IConfirmFormValues & IConfirmProgramProps
): Promise<any> => {
  const authorization = authService.getAuthArg();
  return new CancelablePromise<void>(() => {});
  // return managerApi.confirmProgram2FA(authorization, values);
};
export const get2faInfo = (values: IConfirmProgramProps): Promise<any> => {
  const authorization = authService.getAuthArg();
  return new CancelablePromise<void>(() => {});
  // return managerApi.getProgram2FA(authorization, values);
};

export interface IConfitmService {
  confirm: (values: IConfirmFormValues & IConfirmProgramProps) => Promise<any>;
  get2faInfo: (values: IConfirmProgramProps) => Promise<TwoFactorAuthenticator>;
}
