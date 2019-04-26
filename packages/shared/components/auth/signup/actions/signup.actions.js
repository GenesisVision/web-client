import authApi from "shared/services/api-client/auth-api";
import { ROLE, ROLE_ENV } from "shared/constants/constants";

export const SIGN_UP = "SIGN_UP";
export const RESEND_CONFIRMATION_LINK = "RESEND_CONFIRMATION_LINK";

const signUpMethod =
  ROLE_ENV === ROLE.INVESTOR
    ? authApi.v10AuthSignupInvestorPost
    : authApi.v10AuthSignupManagerPost;

export const signUpUser = model => ({
  type: SIGN_UP,
  payload: signUpMethod({ model })
});

export const resendConfirmationLink = model => ({
  type: RESEND_CONFIRMATION_LINK,
  payload: authApi.v10AuthResendconfirmationlinkPost({ model })
});
