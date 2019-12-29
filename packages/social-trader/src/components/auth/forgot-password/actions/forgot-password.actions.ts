import { ForgotPasswordViewModel, ResetPasswordViewModel } from "gv-api-web";
import authApi from "services/api-client/auth-api";
import { ApiAction } from "utils/types";

export const FORGOT_PASSWORD = "FORGOT_PASSWORD";
export const PASSWORD_RESTORE = "PASSWORD_RESTORE";

export const forgotPasswordAction = (
  model: ForgotPasswordViewModel
): ApiAction<null> => {
  return {
    type: FORGOT_PASSWORD,
    payload: authApi.forgotPassword({ model })
  };
};

export const restorePasswordAction = (
  model: ResetPasswordViewModel
): ApiAction<string> => ({
  type: PASSWORD_RESTORE,
  payload: authApi.resetPassword({ model })
});
