import { Dispatch } from "redux";
import {
  FundWithdraw,
  FundWithdrawalInfoResponse
} from "shared/components/fund-withdraw/fund-withdraw.types";
import { fetchWalletsByCurrencyAvailable } from "shared/components/wallet/actions/wallet.actions";
import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";
import investorApi from "shared/services/api-client/investor-api";
import authService from "shared/services/auth-service";
import { InvestorThunk } from "shared/utils/types";

import {
  getFundWithdrawInfo,
  getRate
} from "../actions/fund-withdrawal.actions";

export const fetchFundWithdrawInfo = (
  id: string,
  currency: string
): InvestorThunk<Promise<FundWithdrawalInfoResponse>> => dispatch => {
  return Promise.all([
    dispatch(getFundWithdrawInfo(id, currency)),
    dispatch(getRate(currency)),
    dispatch(fetchWalletsByCurrencyAvailable(currency))
  ]).then(([withdrawalInfo, rate, wallets]) => {
    return {
      withdrawalInfo: withdrawalInfo.value,
      rate: rate.value,
      wallets: wallets.value.wallets
    };
  });
};

export const withdrawFund = (id: string, onClose: () => void) => (
  value: FundWithdraw
): any => (dispatch: Dispatch) => {
  return investorApi
    .v10InvestorFundsByIdWithdrawByPercentPost(
      id,
      value.percent,
      authService.getAuthArg(),
      { currency: value.currency }
    )
    .then(response => {
      onClose();
      dispatch(
        alertMessageActions.success("withdraw-fund.success-alert-message", true)
      );
      return response;
    });
};
