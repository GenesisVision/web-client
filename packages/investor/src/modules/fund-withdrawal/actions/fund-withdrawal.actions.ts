import { Currency, FundWithdrawInfoOld } from "gv-api-web";
import investorApi from "shared/services/api-client/investor-api";
import authService from "shared/services/auth-service";
import { ApiAction } from "shared/utils/types";

export const FUND_WITHDRAWAL_INFO_ACTION = "FUND_WITHDRAWAL_INFO_ACTION";

export const getFundWithdrawInfoAction = (
  id: string,
  currency: Currency
): ApiAction<FundWithdrawInfoOld> => ({
  type: FUND_WITHDRAWAL_INFO_ACTION,
  payload: investorApi.getFundWithdrawInfo(
    id,
    currency,
    authService.getAuthArg()
  )
});
