import { FundInvestInfo } from "gv-api-web";
import { fetchProfileHeaderInfo } from "shared/components/header/actions/header-actions";
import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";
import investorApi from "shared/services/api-client/investor-api";
import authService from "shared/services/auth-service";
import { RootThunk } from "shared/utils/types";

export const getDepositFundInfo = (
  id: string,
  currency: string
): Promise<FundInvestInfo> => {
  return investorApi.v10InvestorFundsByIdInvestInfoByCurrencyGet(
    id,
    currency,
    authService.getAuthArg()
  );
};

export const fundInvest = (
  id: string,
  amount: number,
  currency: string
): RootThunk<Promise<void>> => dispatch => {
  return investorApi
    .v10InvestorFundsByIdInvestByAmountPost(
      id,
      amount,
      authService.getAuthArg(),
      { currency }
    )
    .then(() => {
      dispatch(
        alertMessageActions.success(
          "deposit-asset.fund.success-alert-message",
          true
        )
      );
      dispatch(fetchProfileHeaderInfo());
    });
};
