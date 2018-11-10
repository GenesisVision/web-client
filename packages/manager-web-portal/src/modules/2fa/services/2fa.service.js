import authActions from "actions/auth-actions";
import { authApiProxy } from "shared/services/api-client/auth-api";
import authService from "shared/services/auth-service";

export const CLIENT_WEB = "Web";

export const confirm2fa = model => dispatch => {
  const authorization = authService.getAuthArg();

  return authApiProxy
    .v10Auth2faConfirmPost(authorization, {
      model
    })
    .then(response => {
      authService.storeToken(response.data.authToken);
      dispatch(authActions.updateToken());
      return response;
    })
    .catch(error => error);
};
