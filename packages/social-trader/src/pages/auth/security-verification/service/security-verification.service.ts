import { api } from "services/api-client/swagger-custom-client";
import authService from "services/auth-service";

export const confirmThreeStepAuth = ({
  email,
  token,
  code
}: {
  email: string;
  token: string;
  code: string;
}) =>
  api
    .auth()
    .confirmThreeStepAuth({
      body: {
        token,
        email,
        code
      }
    })
    .then(response => {
      authService.storeToken(response);
      return response;
    });
