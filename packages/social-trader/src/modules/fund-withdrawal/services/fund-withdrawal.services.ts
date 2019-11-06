import { Currency } from "gv-api-web";
import { Dispatch } from "redux";
import {
  FundWithdraw,
  FundWithdrawalInfoResponse
} from "shared/components/fund-withdraw/fund-withdraw.types";
import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";
import investmentsApi from "shared/services/api-client/investments-api";
//import managerApi from "shared/services/api-client/manager-api";
import walletApi from "shared/services/api-client/wallet-api";
import authService from "shared/services/auth-service";

export const getFundWithdrawInfo = (
  id: string,
  currency: Currency
) => (): Promise<FundWithdrawalInfoResponse> => {
  return Promise.all([
    investmentsApi.getFundWithdrawInfo(id, authService.getAuthArg(), {
      currency
    }),
    walletApi.getWalletAvailable(currency, authService.getAuthArg())
  ]).then(([withdrawalInfo, walletMulti]) => {
    return { withdrawalInfo, wallets: walletMulti.wallets };
  });
};

export const withdrawFund = (id: string, onClose: () => void) => (
  value: FundWithdraw
): any => (dispatch: Dispatch) => {
  return investmentsApi
    .withdrawFromFund(id, authService.getAuthArg(), value)
    .then(response => {
      onClose();
      dispatch(
        alertMessageActions.success("withdraw-fund.success-alert-message", true)
      );
      return response;
    });
};
