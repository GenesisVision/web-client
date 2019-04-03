import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";
import managerApi from "shared/services/api-client/manager-api";
import authService from "shared/services/auth-service";

export const getProgramWithdrawInfo = id => (dispatch, getState) => {
  const { accountSettings } = getState();
  return managerApi.v10ManagerProgramsByIdWithdrawInfoByCurrencyGet(
    id,
    accountSettings.currency,
    authService.getAuthArg()
  );
};

export const withdrawProgramById = (id, amount) => () => {
  return managerApi
    .v10ManagerProgramsByIdWithdrawMultiByAmountPost(
      id,
      amount,
      authService.getAuthArg()
    )
    .then(() => {
      alertMessageActions.success(
        "withdraw-program.success-alert-message",
        true
      );
    });
};

export const alert = (type, text, translate = false) => dispatch =>
  dispatch(alertMessageActions[type](text, translate));
