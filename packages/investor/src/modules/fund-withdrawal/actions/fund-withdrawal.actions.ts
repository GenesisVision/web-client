import { FundWithdrawInfo } from "gv-api-web";
import investorApi from "shared/services/api-client/investor-api";
import { rateApi } from "shared/services/api-client/rate-api";
import authService from "shared/services/auth-service";
import { ApiAction } from "shared/utils/types";

export const FUND_WITHDRAWAL_INFO_ACTION = "FUND_WITHDRAWAL_INFO_ACTION";
export const RATE_ACTION = "RATE_ACTION";

export const getFundWithdrawInfoAction = (
  id: string,
  currency: string
): ApiAction<FundWithdrawInfo> => ({
  type: FUND_WITHDRAWAL_INFO_ACTION,
  payload: investorApi.v10InvestorFundsByIdWithdrawInfoByCurrencyGet(
    id,
    currency,
    authService.getAuthArg()
  )
});

export const getRateAction = (currency: string): ApiAction<number> => ({
  type: RATE_ACTION,
  payload: rateApi.v10RateByFromByToGet("GVT", currency)
});
