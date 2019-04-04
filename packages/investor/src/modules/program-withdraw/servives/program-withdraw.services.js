import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";
import investorApi from "shared/services/api-client/investor-api";
import authService from "shared/services/auth-service";

export const getProgramWithdrawInfo = id => (dispatch, getState) => {
  const { accountSettings } = getState();
  return investorApi.v10InvestorProgramsByIdWithdrawInfoByCurrencyGet(
    id,
    accountSettings.currency,
    authService.getAuthArg()
  );
};

export const withdrawProgramById = (id, amount) => () => {
  return investorApi
    .v10InvestorProgramsByIdWithdrawMultiByAmountPost(
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
