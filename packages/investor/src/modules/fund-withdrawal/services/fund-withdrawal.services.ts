import { Currency } from "gv-api-web";
import { Dispatch } from "redux";
import {
  FundWithdraw,
  FundWithdrawalInfoResponse
} from "shared/components/fund-withdraw/fund-withdraw.types";
import { fetchWalletsByCurrencyAvailableAction } from "shared/components/wallet/actions/wallet.actions";
import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";
import investorApi from "shared/services/api-client/investor-api";
import authService from "shared/services/auth-service";
import { InvestorThunk } from "shared/utils/types";

import { getFundWithdrawInfoAction } from "../actions/fund-withdrawal.actions";

export const fetchFundWithdrawInfo = (
  id: string,
  currency: Currency
): InvestorThunk<Promise<FundWithdrawalInfoResponse>> => dispatch => {
  return Promise.all([
    dispatch(getFundWithdrawInfoAction(id, currency)),
    dispatch(fetchWalletsByCurrencyAvailableAction(currency))
  ]).then(([withdrawalInfo, wallets]) => {
    return {
      withdrawalInfo: withdrawalInfo.value,
      wallets: wallets.value.wallets
    };
  });
};

export const withdrawFund = (id: string, onClose: () => void) => (
  value: FundWithdraw
): any => (dispatch: Dispatch) => {
  return investorApi
    .withdrawFromFund(id, value.percent, authService.getAuthArg(), {
      currency: value.currency
    })
    .then(response => {
      onClose();
      dispatch(
        alertMessageActions.success("withdraw-fund.success-alert-message", true)
      );
      return response;
    });
};
