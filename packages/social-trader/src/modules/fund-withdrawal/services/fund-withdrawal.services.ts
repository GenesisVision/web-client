import { Currency } from "gv-api-web";
import { Dispatch } from "redux";
import {
  FundWithdraw,
  FundWithdrawalInfoResponse
} from "shared/components/fund-withdraw/fund-withdraw.types";
import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";
import managerApi from "shared/services/api-client/manager-api";
import walletApi from "shared/services/api-client/wallet-api";
import authService from "shared/services/auth-service";

export const getFundWithdrawInfo = (
  id: string,
  currency: Currency
) => (): Promise<FundWithdrawalInfoResponse> => {
  return Promise.all([
    managerApi.getFundWithdrawInfo(id, currency, authService.getAuthArg()),
    walletApi.getWalletMultiAvailable(currency, authService.getAuthArg())
  ]).then(([withdrawalInfo, walletMulti]) => {
    return { withdrawalInfo, wallets: walletMulti.wallets };
  });
};

export const withdrawFund = (id: string, onClose: () => void) => (
  value: FundWithdraw
): any => (dispatch: Dispatch) => {
  return managerApi
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
