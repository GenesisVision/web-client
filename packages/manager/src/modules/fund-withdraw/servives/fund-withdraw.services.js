import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";
import managerApi from "shared/services/api-client/manager-api";
import walletApi from "shared/services/api-client/wallet-api";
import authService from "shared/services/auth-service";

export const getFundWithdrawInfo = (id, currency) => (dispatch, getState) => {
  const { accountSettings } = getState();
  return Promise.all([
    managerApi.v10ManagerFundsByIdWithdrawInfoByCurrencyGet(
      id,
      accountSettings.currency,
      authService.getAuthArg()
    ),
    walletApi.v10WalletMultiByCurrencyGet(currency, authService.getAuthArg())
  ]).then(([withdrawalInfo, walletMulti]) => {
    return { withdrawalInfo, wallets: walletMulti.wallets };
  });
};

export const alert = (type, text, translate = false) => dispatch =>
  dispatch(alertMessageActions[type](text, translate));
