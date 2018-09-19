import { fetchWithdrawInfoById } from "modules/program-withdraw/actions/program-withdraw.actions";
import { FETCH_WITHDRAW_PROGRAM_INFO } from "modules/program-withdraw/program-withdraw-constants";
import { investorApiProxy } from "services/api-client/investor-api";
import authService from "services/auth-service";

export const getProgramWithdrawInfo = id => (dispatch, getState) => {
  const { accountSettings } = getState();
  // return dispatch(fetchWithdrawInfoById(id, accountSettings.currency));
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
