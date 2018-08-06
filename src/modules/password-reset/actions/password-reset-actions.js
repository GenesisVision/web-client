import AuthApi from "services/api-client/auth-api";

import * as actionTypes from "./password-reset-actions.constants";

const forgotPassword = fpForm => {
  const model = { ...fpForm };
  return {
    type: actionTypes.FORGOT_PASSWORD,
    payload: AuthApi.v10AuthPasswordForgotInvestorPost({ model })
  };
};

const resetPassword = (userId, code, rpForm) => {
  const model = {
    userId,
    code,
    ...rpForm
  };
  return {
    type: actionTypes.RESET_PASSWORD,
    payload: AuthApi.v10AuthPasswordResetPost({ model })
  };
};

const passwordResetActions = { forgotPassword, resetPassword };

export default passwordResetActions;
