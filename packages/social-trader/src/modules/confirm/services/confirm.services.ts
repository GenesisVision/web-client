import { TwoFactorAuthenticator } from "gv-api-web";
import { IGoogleActivateStepFormValues } from "modules/2fa/google-auth/google-auth-steps/google-auth-activate-step";
import assetsApi from "services/api-client/assets-api";
import authService from "services/auth-service";

import { IConfirmProgramProps } from "../confirm-container";

export const confirm2fa = ({
  code,
  programId
}: IGoogleActivateStepFormValues & IConfirmProgramProps) => {
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
