import authActions from "actions/auth-actions";
import { fetchProfileHeaderInfoAction } from "components/header/actions/header-actions";
import { SETTINGS_ROUTE } from "components/profile/profile.constants";
import { push } from "connected-react-router";
import { ChangePasswordViewModel } from "gv-api-web";
import { alertMessageActions } from "modules/alert-message/actions/alert-message-actions";
import authApi from "services/api-client/auth-api";
import authService from "services/auth-service";
import { MiddlewareDispatch } from "utils/types";

export const changePassword = (body: ChangePasswordViewModel) => (
  dispatch: MiddlewareDispatch
) =>
  authApi
    .changePassword(authService.getAuthArg(), {
      body
    })
    .then((response: string) => {
      authService.storeToken(response);
      dispatch(authActions.updateTokenAction(true));
      dispatch(push(SETTINGS_ROUTE));
      dispatch(fetchProfileHeaderInfoAction());
      dispatch(
        alertMessageActions.success("auth.password-change.success-alert", true)
      );
    });
