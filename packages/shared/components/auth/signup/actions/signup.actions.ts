import { RegisterViewModel, ResendConfirmationViewModel } from "gv-api-web";
import authApi from "shared/services/api-client/auth-api";
import { ApiAction } from "shared/utils/types";

export const SIGN_UP = "SIGN_UP";
export const RESEND_CONFIRMATION_LINK = "RESEND_CONFIRMATION_LINK";

const signUpMethod = authApi.register;

export const signUpUserAction = (model: RegisterViewModel): ApiAction => ({
  type: SIGN_UP,
  payload: signUpMethod({ model })
});

export const resendConfirmationLinkAction = (
  model: ResendConfirmationViewModel
): ApiAction => ({
  type: RESEND_CONFIRMATION_LINK,
  payload: authApi.resendConfirmationLink({ model })
});
