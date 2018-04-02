import swaggerInvestorApi from "../../../services/api-client/swagger-investor-api";

import * as actionTypes from "./password-reset-actions.constants";

const forgotPassword = fpForm => {
  const model = { ...fpForm };
  return {
    type: actionTypes.FORGOT_PASSWORD,
    payload: swaggerInvestorApi.apiInvestorAuthForgotPasswordPost({ model })
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
    payload: swaggerInvestorApi.apiInvestorAuthResetPasswordPost({ model })
  };
};

const passwordResetActions = { forgotPassword, resetPassword };

export default passwordResetActions;
