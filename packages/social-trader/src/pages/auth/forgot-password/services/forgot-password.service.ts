import {
  CaptchaCheckResult,
  ForgotPasswordViewModel,
  ResetPasswordViewModel
} from "gv-api-web";
import { api } from "services/api-client/swagger-custom-client";

export const forgotPassword = (body: ForgotPasswordViewModel) =>
  api
    .auth()
    .forgotPassword({ body })
    .then(() => body);

export const restorePassword = (model: ResetPasswordViewModel) =>
  api.auth().resetPassword({ body: model });

export const sendForgotPasswordEmail = (values: {
  captchaCheckResult: CaptchaCheckResult;
  email: string;
}) => {
  return forgotPassword(values);
};
