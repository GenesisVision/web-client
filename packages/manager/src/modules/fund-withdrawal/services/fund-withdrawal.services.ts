import { Dispatch } from "redux";
import {
  FundWithdraw,
  FundWithdrawalInfoResponse
} from "shared/components/fund-withdraw/fund-withdraw.types";
import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";
import managerApi from "shared/services/api-client/manager-api";
import { rateApi } from "shared/services/api-client/rate-api";
import walletApi from "shared/services/api-client/wallet-api";
import authService from "shared/services/auth-service";

export const getFundWithdrawInfo = (
  id: string,
  currency: string
) => (): Promise<FundWithdrawalInfoResponse> => {
  return Promise.all([
    managerApi.v10ManagerFundsByIdWithdrawInfoByCurrencyGet(
      id,
      currency,
      authService.getAuthArg()
    ),
    walletApi.v10WalletMultiByCurrencyAvailableGet(
      currency,
      authService.getAuthArg()
    ),
    rateApi.v10RateByFromByToGet("GVT", currency)
  ]).then(([withdrawalInfo, walletMulti, rate]) => {
    return { withdrawalInfo, wallets: walletMulti.wallets, rate };
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
