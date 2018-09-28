import { investorApiProxy } from "services/api-client/investor-api";
import authService from "services/auth-service";

export const getProgramWithdrawInfo = id => (dispatch, getState) => {
  const { accountSettings } = getState();
  return investorApiProxy.v10InvestorProgramsByIdWithdrawInfoByCurrencyGet(
    id,
    accountSettings.currency,
    authService.getAuthArg()
  );
};

export const withdrawProgramById = (id, amount) => {
  return investorApiProxy.v10InvestorProgramsByIdWithdrawByAmountPost(
    id,
    amount,
    authService.getAuthArg()
  );
};
