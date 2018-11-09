import AuthApi from "services/api-client/auth-api";

export const FORGOT_PASSWORD = "FORGOT_PASSWORD";
export const PASSWORD_RESTORE = "PASSWORD_RESTORE";

const forgotPassword = fpForm => {
  const model = { ...fpForm };
  return {
    type: FORGOT_PASSWORD,
    payload: AuthApi.v10AuthPasswordForgotInvestorPost({ model })
  };
};

const restorePassword = (userId, code, rpForm) => {
  const model = {
    userId,
    code,
    ...rpForm
  };
  return {
    type: PASSWORD_RESTORE,
    payload: AuthApi.v10AuthPasswordResetPost({ model })
  };
};

const passwordRestoreActions = {
  forgotPassword,
  restorePassword
};

export default passwordRestoreActions;
