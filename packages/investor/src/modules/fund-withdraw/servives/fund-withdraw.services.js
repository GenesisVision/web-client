import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";
import investorApi from "shared/services/api-client/investor-api";
import authService from "shared/services/auth-service";

export const getFundWithdrawInfo = id => (dispatch, getState) => {
  const { accountSettings } = getState();
  return investorApi.v10InvestorFundsByIdWithdrawInfoByCurrencyGet(
    id,
    accountSettings.currency,
    authService.getAuthArg()
  );
};

export const withdrawFundById = (id, percent) => {
  return investorApi
    .v10InvestorFundsByIdWithdrawByPercentPost(
      id,
      percent,
      authService.getAuthArg()
    )
    .then(response => {
      alertMessageActions.success("fund-withdraw.success-alert-message", true);
      return response;
    });
};

export const alert = (type, text, translate = false) => dispatch =>
  dispatch(alertMessageActions[type](text, translate));
