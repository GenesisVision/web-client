import { FundWithdrawInfo, WalletData } from "gv-api-web";
import { Dispatch } from "redux";
import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";
import investorApi from "shared/services/api-client/investor-api";
import walletApi from "shared/services/api-client/wallet-api";
import authService from "shared/services/auth-service";

export type FundWithdraw = {
  percent: number;
  currency: string;
};

export type FundWithdrawalInfoResponse = {
  withdrawalInfo: FundWithdrawInfo;
  wallets: WalletData[];
};

export const getFundWithdrawInfo = (
  id: string,
  currency: string
) => (): Promise<FundWithdrawalInfoResponse> => {
  return Promise.all([
    investorApi.v10InvestorFundsByIdWithdrawInfoByCurrencyGet(
      id,
      currency,
      authService.getAuthArg()
    ),
    walletApi.v10WalletMultiByCurrencyGet(currency, authService.getAuthArg())
  ]).then(([withdrawalInfo, walletMulti]) => {
    return { withdrawalInfo, wallets: walletMulti.wallets };
  });
};

export const withdrawFund = (id: string, onClose: () => void) => (
  value: FundWithdraw
) => (dispatch: Dispatch) => {
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
