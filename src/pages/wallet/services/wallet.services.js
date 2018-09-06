import authService from "services/auth-service";

import * as actions from "../actions/wallet.actions";

export const fetchWalletBalance = () => (dispatch, getState) => {
  const authorization = authService.getAuthArg();
  const currency = getState().wallet.currentCurrency.value;

  dispatch(actions.fetchWalletBalance(currency, authorization));
};
