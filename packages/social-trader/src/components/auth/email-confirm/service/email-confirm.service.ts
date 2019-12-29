import authActions from "actions/auth-actions";
import { CancelablePromise } from "gv-api-web";
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
  });
