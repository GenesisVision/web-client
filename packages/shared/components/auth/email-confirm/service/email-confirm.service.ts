import { push } from "connected-react-router";
import authActions from "shared/actions/auth-actions";
import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";
import { HOME_ROUTE } from "shared/routes/app.routes";
import authApi from "shared/services/api-client/auth-api";
import authService from "shared/services/auth-service";
import { MiddlewareDispatch } from "shared/utils/types";

export const confirmEmail = (userId: string, code: string) => (
  dispatch: MiddlewareDispatch
): Promise<void> =>
  authApi
    .v10AuthSignupConfirmPost({
      userId,
      code
    })
    .then(response => {
      authService.storeToken(response);
      dispatch(authActions.updateTokenAction(true));
      dispatch(push(HOME_ROUTE));
      dispatch(
        alertMessageActions.success(
          "auth.email-confirm.success-alert-message",
          true
        )
      );
    });
