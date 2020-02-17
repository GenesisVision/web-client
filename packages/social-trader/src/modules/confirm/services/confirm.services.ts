import { TwoFactorAuthenticator } from "gv-api-web";
import assetsApi from "services/api-client/assets-api";
import authService from "services/auth-service";

import { IConfirmProgramProps } from "../confirm-container";

export const confirm2fa = ({
  code,
  programId
}: IConfirmFormValues & IConfirmProgramProps) => {
  const authorization = authService.getAuthArg();
  return assetsApi.confirmProgram2FA(programId, authorization, {
    body: { twoFactorCode: code }
  });
};

export const get2faInfo = ({
  programId
}: IConfirmProgramProps): Promise<TwoFactorAuthenticator> => {
  const authorization = authService.getAuthArg();
  return assetsApi.getProgram2FA(programId, authorization);
};

enum FIELDS {
  code = "code"
}

export interface IConfirmFormValues {
  [FIELDS.code]: string;
}
