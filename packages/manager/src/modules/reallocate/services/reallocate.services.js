import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";
import managerApi from "shared/services/api-client/manager-api";
import authService from "shared/services/auth-service";

export const updateAssets = (id, values) => dispatch => {
  const authorization = authService.getAuthArg();
  return managerApi
    .v10ManagerFundsByIdAssetsUpdatePost(id, authorization, {
      assets: values.assets
    })
    .then(res => {
      dispatch(
        alertMessageActions.success("reallocate.success-alert-message", true)
      );
    });
};
export const alert = (type, text, translate = false) => dispatch =>
  dispatch(alertMessageActions[type](text, translate));
