import authActions from "shared/actions/auth-actions";
import { HOME_ROUTE } from "pages/app/app.routes";
import { push } from "react-router-redux";
import { authApiProxy } from "shared/services/api-client/auth-api";
import authService from "shared/services/auth-service";
import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";

export const confirmEmail = (userId, code) => dispatch => {
  return authApiProxy
    .v10AuthSignupConfirmPost({
      userId,
      code
    })
    .then(response => {
      authService.storeToken(response.value);
      dispatch(authActions.updateToken());
      dispatch(push(HOME_ROUTE));
      dispatch(
        alertMessageActions.success(
          "auth.email-confirm.success-alert-message",
          true
        )
      );
    });
};
