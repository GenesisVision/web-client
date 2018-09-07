import authService from "services/auth-service";

import * as actions from "../actions/wallet.actions";

export const fetchWalletBalance = () => (dispatch, getState) => {
  const authorization = authService.getAuthArg();
  const currency = getState().walletSettings.currentCurrency;

  dispatch(actions.fetchWalletBalance(currency, authorization));
};
