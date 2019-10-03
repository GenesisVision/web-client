import { getManagerFundWithdrawInfoAction } from "modules/fund-withdrawal/actions/fund-withdrawal.actions";
import { Dispatch } from "redux";
import {
  FundWithdraw,
  ManagerFundWithdrawalInfoResponse
} from "shared/components/fund-withdraw/fund-withdraw.types";
import { fetchWalletsByCurrencyAvailableAction } from "shared/components/wallet/actions/wallet.actions";
import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";
import managerApi from "shared/services/api-client/manager-api";
import authService from "shared/services/auth-service";
import { ManagerThunk } from "shared/utils/types";

export const getFundWithdrawInfo = (
  id: string,
  currency: string
): ManagerThunk<Promise<ManagerFundWithdrawalInfoResponse>> => dispatch => {
  return Promise.all([
    dispatch(getManagerFundWithdrawInfoAction(id, currency)),
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
  return managerApi
    .v10ManagerFundsByIdWithdrawByPercentPost(
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
