import { TwoFactorAuthenticator } from "gv-api-web";
import managerApi from "shared/services/api-client/manager-api";
import authService from "shared/services/auth-service";

import { IConfirmFormValues } from "../components/confirm-form";
import { IConfirmProgramProps } from "../confirm-container";

export const confirm = (
  values: IConfirmFormValues & IConfirmProgramProps
): Promise<any> => {
  const authorization = authService.getAuthArg();
  return managerApi.v10ManagerPrograms2faConfirmPost(authorization, values);
};
export const get2faInfo = (
  values: IConfirmProgramProps
): Promise<TwoFactorAuthenticator> => {
  const authorization = authService.getAuthArg();
  return managerApi.v10ManagerPrograms2faGetGet(authorization, values);
};

export interface IConfitmService {
  confirm: (values: IConfirmFormValues & IConfirmProgramProps) => Promise<any>;
  get2faInfo: (values: IConfirmProgramProps) => Promise<TwoFactorAuthenticator>;
}
