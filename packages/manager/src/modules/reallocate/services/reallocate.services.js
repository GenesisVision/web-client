import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";
import { managerApiProxy } from "shared/services/api-client/manager-api";
import authService from "shared/services/auth-service";

export const updateAssets = (id, values) => dispatch => {
  const authorization = authService.getAuthArg();
  return managerApiProxy
    .v10ManagerFundsByIdAssetsUpdatePost(id, authorization, {
      assets: values.assets
    })
    .then(res => {
      dispatch(
        alertMessageActions.success("reallocate.success-alert-message", true)
      );
    })
    .catch(error => {
      // debugger
    });
};
export const alert = (type, text, translate = false) => dispatch =>
  dispatch(alertMessageActions[type](text, translate));
