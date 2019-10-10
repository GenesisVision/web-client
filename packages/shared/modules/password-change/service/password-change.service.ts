import { push } from "connected-react-router";
import { ChangePasswordViewModel } from "gv-api-web";
import authActions from "shared/actions/auth-actions";
import { fetchProfileHeaderInfoAction } from "shared/components/header/actions/header-actions";
import { SETTINGS_ROUTE } from "shared/components/profile/profile.constants";
import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";
import authApi from "shared/services/api-client/auth-api";
import authService from "shared/services/auth-service";
import { MiddlewareDispatch } from "shared/utils/types";

export const changePassword = (model: ChangePasswordViewModel) => (
  dispatch: MiddlewareDispatch
) =>
  authApi
    .changePassword(authService.getAuthArg(), {
      model
    })
    .then((response: string) => {
      authService.storeToken(response);
      dispatch(authActions.updateTokenAction());
      dispatch(push(SETTINGS_ROUTE));
      dispatch(fetchProfileHeaderInfoAction());
      dispatch(
        alertMessageActions.success("auth.password-change.success-alert", true)
      );
    });
