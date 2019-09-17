import { push } from "connected-react-router";
import { CancelablePromise } from "gv-api-web";
import authActions from "shared/actions/auth-actions";
import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";
import { HOME_ROUTE } from "shared/routes/app.routes";
import authApi from "shared/services/api-client/auth-api";
import authService from "shared/services/auth-service";
import { MiddlewareDispatch } from "shared/utils/types";

export const confirmEmail = ({
  userId,
  code
}: {
  userId: string;
  code: string;
}) => (dispatch: MiddlewareDispatch): CancelablePromise<void> =>
  authApi.v10AuthSignupConfirmPost({ userId, code }).then(response => {
    authService.storeToken(response);
    dispatch(authActions.updateTokenAction());
    dispatch(push(HOME_ROUTE));
    dispatch(
      alertMessageActions.success(
        "auth.email-confirm.success-alert-message",
        true
      )
    );
  });
