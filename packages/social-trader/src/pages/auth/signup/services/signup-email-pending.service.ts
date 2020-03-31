import { api } from "services/api-client/swagger-custom-client";

export const sendConfirmationLink = (email: string) => () =>
  api.auth().resendConfirmationLink({
    body: {
      email,
      captchaCheckResult: {
        id: "",
        pow: {
          prefix: ""
        },
        geeTest: {}
      }
    }
  });
