import authService from "services/auth-service";

import * as actions from "../actions/wallet.actions";

export const fetchWalletBalance = () => (dispatch, getState) => {
  const authorization = authService.getAuthArg();
  const { currentCurrency } = getState().accountSettings;

  dispatch(actions.fetchWalletBalance(currentCurrency, authorization));
};
