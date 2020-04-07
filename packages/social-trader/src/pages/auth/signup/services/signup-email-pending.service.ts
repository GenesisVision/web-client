import { CaptchaCheckResult } from "gv-api-web";
import authApi from "services/api-client/auth-api";

export const sendConfirmationLink = (email: string) => ({
  captchaCheckResult
}: {
  captchaCheckResult: CaptchaCheckResult;
}) =>
  authApi.resendConfirmationLink({
    body: {
      email,
      captchaCheckResult
    }
  });
