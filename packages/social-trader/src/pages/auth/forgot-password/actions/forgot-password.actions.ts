import { ForgotPasswordViewModel } from "gv-api-web";
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
