import authApi from "services/api-client/auth-api";

import * as actionTypes from "./register-actions.constants";

const registerUser = model => ({
  type: actionTypes.REGISTER,
  payload: authApi.v10AuthSignupInvestorPost({ model })
});

const resendConfirmationLink = model => ({
  type: actionTypes.RESEND_CONFIRMATION_LINK,
  payload: authApi.v10AuthResendconfirmationlinkPost({ model })
});

const registerActions = { registerUser, resendConfirmationLink };
export default registerActions;
