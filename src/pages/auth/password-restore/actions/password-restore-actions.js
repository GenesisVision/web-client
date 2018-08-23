import AuthApi from "services/api-client/auth-api";

import * as actionTypes from "./password-restore-actions.constants";

const forgotPassword = fpForm => {
  const model = { ...fpForm };
  return {
    type: actionTypes.FORGOT_PASSWORD,
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
    type: actionTypes.PASSWORD_RESTORE,
    payload: AuthApi.v10AuthPasswordResetPost({ model })
  };
};

const passwordRestoreActions = {
  forgotPassword,
  restorePassword
};

export default passwordRestoreActions;
