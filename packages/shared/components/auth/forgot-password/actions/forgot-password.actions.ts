import { ForgotPasswordViewModel, ResetPasswordViewModel } from "gv-api-web";
import { ROLE, ROLE_ENV } from "shared/constants/constants";
import AuthApi from "shared/services/api-client/auth-api";
import { ApiAction } from "shared/utils/types";

export const FORGOT_PASSWORD = "FORGOT_PASSWORD";
export const PASSWORD_RESTORE = "PASSWORD_RESTORE";

export const forgotPasswordAction = (
  model: ForgotPasswordViewModel
): ApiAction<string> => {
  return {
    type: FORGOT_PASSWORD,
    payload: AuthApi.forgotPassword({ model })
  };
};

export const restorePasswordAction = (
  model: ResetPasswordViewModel
): ApiAction<string> => ({
  type: PASSWORD_RESTORE,
  payload: AuthApi.resetPassword({ model })
});
