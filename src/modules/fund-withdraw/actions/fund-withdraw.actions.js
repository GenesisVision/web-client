import { FETCH_WITHDRAW_PROGRAM_INFO } from "modules/fund-withdraw/fund-withdraw-constants";
import investorApi, {
  investorApiProxy
} from "services/api-client/investor-api";
import authService from "services/auth-service";

export const fetchWithdrawInfoById = (id, currency) => ({
  type: FETCH_WITHDRAW_PROGRAM_INFO,
  payload: investorApiProxy.v10InvestorProgramsByIdWithdrawInfoByCurrencyGet(
    id,
    currency,
    authService.getAuthArg()
  )
});

// export const withdrawProgramById = (id, percent) => ({
//   type: FETCH_WITHDRAW_PROGRAM_INFO,
//   payload: investorApiProxy.v10InvestorProgramsByIdWithdrawByAmountPost(
//     id,
//     percent,
//     authService.getAuthArg()
//   )
// });
