import { ForgotPasswordViewModel, ResetPasswordViewModel } from "gv-api-web";
import { ROLE, ROLE_ENV } from "shared/constants/constants";
import AuthApi from "shared/services/api-client/auth-api";
import { ApiAction } from "shared/utils/types";

export const FORGOT_PASSWORD = "FORGOT_PASSWORD";
export const PASSWORD_RESTORE = "PASSWORD_RESTORE";

export const forgotPasswordAction = (
  model: ForgotPasswordViewModel
): ApiAction<string> => {
  const method =
    ROLE_ENV === ROLE.MANAGER
      ? AuthApi.v10AuthPasswordForgotManagerPost
      : AuthApi.v10AuthPasswordForgotInvestorPost;
  return {
    type: FORGOT_PASSWORD,
    payload: method({ model })
  };
};

export const restorePasswordAction = (
  model: ResetPasswordViewModel
): ApiAction<string> => ({
  type: PASSWORD_RESTORE,
  payload: AuthApi.v10AuthPasswordResetPost({ model })
});
