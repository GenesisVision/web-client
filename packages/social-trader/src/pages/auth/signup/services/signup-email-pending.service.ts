import { CaptchaCheckResult } from "gv-api-web";
import { api } from "services/api-client/swagger-custom-client";

export const sendConfirmationLink = (email: string) => ({
  captchaCheckResult
}: {
  captchaCheckResult: CaptchaCheckResult;
}) =>
  api.auth().resendConfirmationLink({
    body: {
      email,
      captchaCheckResult
    }
  });
