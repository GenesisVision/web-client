import authService from "shared/services/auth-service";
import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";
import { managerApiProxy } from "shared/services/api-client/manager-api";

export const getProgramWithdrawInfo = id => (dispatch, getState) => {
  const { accountSettings } = getState();
  return managerApiProxy.v10ManagerProgramsByIdWithdrawInfoByCurrencyGet(
    id,
    accountSettings.currency,
    authService.getAuthArg()
  );
};

export const alert = (type, text, translate = false) => dispatch =>
  dispatch(alertMessageActions[type](text, translate));
