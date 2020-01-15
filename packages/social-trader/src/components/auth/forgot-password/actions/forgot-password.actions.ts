import { ForgotPasswordViewModel, ResetPasswordViewModel } from "gv-api-web";
import authApi from "services/api-client/auth-api";
import { ApiAction } from "utils/types";

export const FORGOT_PASSWORD = "FORGOT_PASSWORD";
export const PASSWORD_RESTORE = "PASSWORD_RESTORE";

export const forgotPasswordAction = (
  body: ForgotPasswordViewModel
): ApiAction => {
  return {
    type: FORGOT_PASSWORD,
    payload: authApi.forgotPassword({ body })
  };
};

export const restorePasswordAction = (
  body: ResetPasswordViewModel
): ApiAction<string> => ({
  type: PASSWORD_RESTORE,
  payload: authApi.resetPassword({ body })
});
