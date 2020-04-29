import authActions from "actions/auth-actions";
import { fetchProfileHeaderInfoAction } from "components/header/actions/header-actions";
import { Push } from "components/link/link";
import { SECURITY_ROUTE } from "components/profile/profile.constants";
import { ChangePasswordViewModel } from "gv-api-web";
import { alertMessageActions } from "modules/alert-message/actions/alert-message-actions";
import authApi from "services/api-client/auth-api";
import { api } from "services/api-client/swagger-custom-client";
import authService from "services/auth-service";
import { MiddlewareDispatch } from "utils/types";

export const changePassword = (body: ChangePasswordViewModel) => (
  dispatch: MiddlewareDispatch
) =>
  api
    .auth()
    .changePassword({
      body
    })
    .then((response: string) => {
      authService.storeToken(response);
      dispatch(authActions.updateTokenAction(true));
      Push(SECURITY_ROUTE);
      dispatch(fetchProfileHeaderInfoAction());
      dispatch(
        alertMessageActions.success("auth.password-change.success-alert", true)
      );
    });
