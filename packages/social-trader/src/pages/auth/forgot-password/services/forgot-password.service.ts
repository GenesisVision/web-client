import {
  CaptchaCheckResult,
  ForgotPasswordViewModel,
  ResetPasswordViewModel
} from "gv-api-web";
import authApi from "services/api-client/auth-api";

export const forgotPassword = (body: ForgotPasswordViewModel) =>
  authApi.forgotPassword({ body }).then(() => body);

export const restorePassword = (model: ResetPasswordViewModel) =>
  authApi.resetPassword({ body: model });

export const sendForgotPasswordEmail = (values: {
  captchaCheckResult: CaptchaCheckResult;
  email: string;
}) => {
  return forgotPassword(values);
};
