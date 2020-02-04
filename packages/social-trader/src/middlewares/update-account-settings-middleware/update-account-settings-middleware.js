import { UPDATE_ACCOUNT_SETTINGS_CURRENCY } from "actions/account-settings-actions";
import { setCookie } from "utils/cookie";

export const ACCOUNT_CURRENCY_KEY = "accountCurrency";

export const updateAccountCurrencyMiddleware = store => next => action => {
  if (action.type === UPDATE_ACCOUNT_SETTINGS_CURRENCY) {
    setCookie(ACCOUNT_CURRENCY_KEY, action.payload);
  }
  return next(action);
};
