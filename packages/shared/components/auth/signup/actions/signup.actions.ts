import {
  RegisterInvestorViewModel,
  RegisterManagerViewModel,
  ResendConfirmationViewModel
} from "gv-api-web";
import { ROLE, ROLE_ENV } from "shared/constants/constants";
import authApi from "shared/services/api-client/auth-api";

export const SIGN_UP = "SIGN_UP";
export const RESEND_CONFIRMATION_LINK = "RESEND_CONFIRMATION_LINK";

const signUpMethod =
  ROLE_ENV === ROLE.INVESTOR
    ? authApi.v10AuthSignupInvestorPost
    : authApi.v10AuthSignupManagerPost;

export type RegisterViewModel =
  | RegisterInvestorViewModel
  | RegisterManagerViewModel;

export const signUpUser = (model: RegisterViewModel) => ({
  type: SIGN_UP,
  payload: signUpMethod({ model })
});

export const resendConfirmationLink = (model: ResendConfirmationViewModel) => ({
  type: RESEND_CONFIRMATION_LINK,
  payload: authApi.v10AuthResendconfirmationlinkPost({ model })
});
