import { investorApiProxy } from "services/api-client/investor-api";
import authService from "services/auth-service";
import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";
import { managerApiProxy } from "services/api-client/manager-api";

export const getFundWithdrawInfo = id => (dispatch, getState) => {
  const { accountSettings } = getState();
  return investorApiProxy.v10InvestorFundsByIdWithdrawInfoByCurrencyGet(
    id,
    accountSettings.currency,
    authService.getAuthArg()
  );
};

export const withdrawFundById = (id, percent) => {
  return investorApiProxy
    .v10InvestorFundsByIdWithdrawByPercentPost(
      id,
      percent,
      authService.getAuthArg()
    )
    .then(response => {
      alertMessageActions.success("fund-withdraw.success-alert-message", true);
      return response;
    })
    .catch(error => {
      alertMessageActions.success(error.errorMessage, true);
      return error;
    });
};
