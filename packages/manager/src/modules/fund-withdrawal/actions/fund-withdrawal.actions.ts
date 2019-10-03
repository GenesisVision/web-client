import { ManagerFundWithdrawInfo } from "gv-api-web";
import {
  FUND_WITHDRAWAL_INFO_ACTION,
  RATE_ACTION
} from "investor-web-portal/src/modules/fund-withdrawal/actions/fund-withdrawal.actions";
import managerApi from "shared/services/api-client/manager-api";
import { rateApi } from "shared/services/api-client/rate-api";
import authService from "shared/services/auth-service";
import { ApiAction } from "shared/utils/types";

export const getManagerFundWithdrawInfoAction = (
  id: string,
  currency: string
): ApiAction<ManagerFundWithdrawInfo> => ({
  type: FUND_WITHDRAWAL_INFO_ACTION,
  payload: managerApi.v10ManagerFundsByIdWithdrawInfoByCurrencyGet(
    id,
    currency,
    authService.getAuthArg()
  )
});

export const getRateAction = (currency: string): ApiAction<number> => ({
  type: RATE_ACTION,
  payload: rateApi.v10RateByFromByToGet("GVT", currency)
});
