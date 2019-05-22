import { CancelablePromise, ProgramWithdrawInfo } from "gv-api-web";
import investorApi from "shared/services/api-client/investor-api";
import authService from "shared/services/auth-service";
import { ActionType, CurrencyEnum } from "shared/utils/types";

import { FETCH_WITHDRAW_PROGRAM_INFO } from "../program-withdraw.constants";

export const fetchWithdrawInfoById = (
  id: string,
  currency: CurrencyEnum
): ActionType<CancelablePromise<ProgramWithdrawInfo>> => ({
  type: FETCH_WITHDRAW_PROGRAM_INFO,
  payload: investorApi.v10InvestorProgramsByIdWithdrawInfoByCurrencyGet(
    id,
    currency,
    authService.getAuthArg()
  )
});
