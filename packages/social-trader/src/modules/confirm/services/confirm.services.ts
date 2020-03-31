import { TwoFactorAuthenticator } from "gv-api-web";
import { IGoogleActivateStepFormValues } from "modules/2fa/google-auth/google-auth-steps/google-auth-activate-step";
import assetsApi from "services/api-client/assets-api";
import { api, Token } from "services/api-client/swagger-custom-client";
import authService from "services/auth-service";

import { IConfirmProgramProps } from "../confirm-container";

export const confirm2fa = ({
  code,
  programId
}: IGoogleActivateStepFormValues & IConfirmProgramProps) => {
  return api.assets().confirmProgram2FA(programId, {
    body: { twoFactorCode: code }
  });
};

export const get2faInfo = ({
  programId
}: IConfirmProgramProps): Promise<TwoFactorAuthenticator> => {
  return api.assets().getProgram2FA(programId);
};

enum FIELDS {
  code = "code"
}

export interface IConfirmFormValues {
  [FIELDS.code]: string;
}
