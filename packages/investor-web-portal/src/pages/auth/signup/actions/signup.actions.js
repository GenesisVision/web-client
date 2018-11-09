import authApi from "services/api-client/auth-api";

export const SIGN_UP = "SIGN_UP";
export const RESEND_CONFIRMATION_LINK = "RESEND_CONFIRMATION_LINK";

export const signUpUser = model => ({
  type: SIGN_UP,
  payload: authApi.v10AuthSignupInvestorPost({ model })
});

export const resendConfirmationLink = model => ({
  type: RESEND_CONFIRMATION_LINK,
  payload: authApi.v10AuthResendconfirmationlinkPost({ model })
});
