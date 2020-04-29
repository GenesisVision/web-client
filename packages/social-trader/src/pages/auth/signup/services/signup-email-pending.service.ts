import { api } from "services/api-client/swagger-custom-client";
import { CaptchaCheckResult } from "gv-api-web";

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
