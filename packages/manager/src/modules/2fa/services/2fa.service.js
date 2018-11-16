import authActions from "shared/actions/auth-actions";
import authApi from "shared/services/api-client/auth-api";
import authService from "shared/services/auth-service";

export const CLIENT_WEB = "Web";

export const confirm2fa = model => dispatch => {
  const authorization = authService.getAuthArg();

  return authApi
    .v10Auth2faConfirmPost(authorization, {
      model
    })
    .then(response => {
      authService.storeToken(response.authToken);
      dispatch(authActions.updateToken());
      return response;
    })
    .catch(error => error);
};
