import authApi from "services/api-client/auth-api";
import authService from "services/auth-service";

export const confirmEmail = ({
  userId,
  code
}: {
  userId: string;
  code: string;
}) =>
  authApi.confirmEmail({ userId, code }).then(response => {
    authService.storeToken(response);
    return response;
  });
