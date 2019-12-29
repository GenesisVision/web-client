import { CancelablePromise, TwoFactorAuthenticator } from "gv-api-web";
import assetsApi from "services/api-client/assets-api";
import authService from "services/auth-service";

import { IConfirmFormValues } from "../components/confirm-form";
import { IConfirmProgramProps } from "../confirm-container";

export const confirm2fa = ({
  code,
  programId
}: IConfirmFormValues & IConfirmProgramProps): CancelablePromise<null> => {
  const authorization = authService.getAuthArg();
  return assetsApi.confirmProgram2FA(programId, authorization, {
    model: { twoFactorCode: code }
  });
};
export const get2faInfo = ({
  programId
}: IConfirmProgramProps): CancelablePromise<TwoFactorAuthenticator> => {
  const authorization = authService.getAuthArg();
  return assetsApi.getProgram2FA(programId, authorization);
};
