import { ChangePasswordViewModel } from "gv-api-web";
import { push } from "react-router-redux";
import { Dispatch } from "redux";
import authActions from "shared/actions/auth-actions";
import { SETTINGS_ROUTE } from "shared/components/profile/profile.constants";
import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";
import authApi from "shared/services/api-client/auth-api";
import authService from "shared/services/auth-service";

export const changePassword = (model: ChangePasswordViewModel) => (
  dispatch: Dispatch
) => {
  return authApi
    .v10AuthPasswordChangePost(authService.getAuthArg(), {
      model
    })
    .then((response: string) => {
      authService.storeToken(response);
      dispatch(authActions.updateToken());
      dispatch(push(SETTINGS_ROUTE));
      dispatch(
        alertMessageActions.success("auth.password-change.success-alert", true)
      );
    });
};
