import { RegisterViewModel, ResendConfirmationViewModel } from "gv-api-web";
import authApi from "services/api-client/auth-api";
import { ApiAction } from "utils/types";

export const SIGN_UP = "SIGN_UP";
export const RESEND_CONFIRMATION_LINK = "RESEND_CONFIRMATION_LINK";

const signUpMethod = authApi.register;

export const signUpUserAction = (body: RegisterViewModel): ApiAction => ({
  type: SIGN_UP,
  payload: signUpMethod({ body })
});

export const resendConfirmationLinkAction = (
  body: ResendConfirmationViewModel
): ApiAction => ({
  type: RESEND_CONFIRMATION_LINK,
  payload: authApi.resendConfirmationLink({ body })
});
