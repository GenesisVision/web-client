import authActions from "actions/auth-actions";
import { push } from "connected-react-router";
import { CancelablePromise } from "gv-api-web";
import { alertMessageActions } from "modules/alert-message/actions/alert-message-actions";
import { HOME_ROUTE } from "routes/app.routes";
import authApi from "services/api-client/auth-api";
import authService from "services/auth-service";
import { MiddlewareDispatch } from "utils/types";

export const confirmEmail = ({
  userId,
  code
}: {
  userId: string;
  code: string;
}) => (dispatch: MiddlewareDispatch): CancelablePromise<void> =>
  authApi.confirmEmail({ userId, code }).then(response => {
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
