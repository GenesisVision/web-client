import authApi from "services/api-client/auth-api";

export const sendConfirmationLink = (email: string) => () =>
  authApi.resendConfirmationLink({
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
