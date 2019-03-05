import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";
import investorApi from "shared/services/api-client/investor-api";
import walletApi from "shared/services/api-client/wallet-api";
import authService from "shared/services/auth-service";

export const getFundWithdrawInfo = (id, currency) => (dispatch, getState) => {
  const { accountSettings } = getState();
  return Promise.all([
    investorApi.v10InvestorFundsByIdWithdrawInfoByCurrencyGet(
      id,
      accountSettings.currency,
      authService.getAuthArg()
    ),
    walletApi.v10WalletMultiByCurrencyGet(currency, authService.getAuthArg())
  ]).then(([withdrawalInfo, walletMulti]) => {
    return { withdrawalInfo, wallets: walletMulti.wallets };
  });
};

export const withdrawFundById = (id, percent) => {
  return investorApi
    .v10InvestorFundsByIdWithdrawByPercentPost(
      id,
      percent,
      authService.getAuthArg()
    )
    .then(response => {
      alertMessageActions.success("fund-withdraw.success-alert-message", true);
      return response;
    });
};

export const alert = (type, text, translate = false) => dispatch =>
  dispatch(alertMessageActions[type](text, translate));
