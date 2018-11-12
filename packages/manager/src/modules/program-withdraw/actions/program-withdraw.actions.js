import { FETCH_WITHDRAW_PROGRAM_INFO } from "modules/program-withdraw/program-withdraw-constants";
import investorApi, {
  investorApiProxy
} from "shared/services/api-client/investor-api";
import authService from "shared/services/auth-service";

export const fetchWithdrawInfoById = (id, currency) => ({
  type: FETCH_WITHDRAW_PROGRAM_INFO,
  payload: investorApiProxy.v10InvestorProgramsByIdWithdrawInfoByCurrencyGet(
    id,
    currency,
    authService.getAuthArg()
  )
});

// export const withdrawProgramById = (id, amount) => ({
//   type: FETCH_WITHDRAW_PROGRAM_INFO,
//   payload: investorApiProxy.v10InvestorProgramsByIdWithdrawByAmountPost(
//     id,
//     amount,
//     authService.getAuthArg()
//   )
// });
