import { api } from "services/api-client/swagger-custom-client";
import authService from "services/auth-service";

export const confirmEmail = ({
  userId,
  code
}: {
  userId: string;
  code: string;
}) =>
  api
    .auth()
    .confirmEmail({ userId, code })
    .then(response => {
      authService.storeToken(response);
      return response;
    });
