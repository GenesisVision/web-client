import { FETCH_WITHDRAW_PROGRAM_INFO } from "modules/fund-withdraw/fund-withdraw-constants";
import investorApi from "shared/services/api-client/investor-api";
import authService from "shared/services/auth-service";

export const fetchWithdrawInfoById = (id, currency) => ({
  type: FETCH_WITHDRAW_PROGRAM_INFO,
  payload: investorApi.v10InvestorProgramsByIdWithdrawInfoByCurrencyGet(
    id,
    currency,
    authService.getAuthArg()
  )
});
