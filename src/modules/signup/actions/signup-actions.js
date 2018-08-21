import authApi from "services/api-client/auth-api";

import * as actionTypes from "./signup-actions.constants";

const signUpUser = model => ({
  type: actionTypes.SIGN_UP,
  payload: authApi.v10AuthSignupInvestorPost({ model })
});

const resendConfirmationLink = model => ({
  type: actionTypes.RESEND_CONFIRMATION_LINK,
  payload: authApi.v10AuthResendconfirmationlinkPost({ model })
});

const signUpActions = { signUpUser, resendConfirmationLink };
export default signUpActions;
