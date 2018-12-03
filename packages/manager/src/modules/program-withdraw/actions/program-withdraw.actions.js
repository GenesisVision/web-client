import { FETCH_WITHDRAW_PROGRAM_INFO } from "modules/program-withdraw/program-withdraw-constants";
import managerApi from "shared/services/api-client/manager-api";
import authService from "shared/services/auth-service";

export const fetchWithdrawInfoById = (id, currency) => ({
  type: FETCH_WITHDRAW_PROGRAM_INFO,
  payload: managerApi.v10InvestorProgramsByIdWithdrawInfoByCurrencyGet(
    id,
    currency,
    authService.getAuthArg()
  )
});
