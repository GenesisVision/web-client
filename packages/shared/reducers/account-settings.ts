import { combineReducers } from "redux";
import { UPDATE_ACCOUNT_SETTINGS } from "shared/actions/account-settings-actions";
import { ACCOUNT_CURRENCY_KEY } from "shared/middlewares/update-account-settings-middleware/update-account-settings-middleware";
import twoFactorReducer from "shared/reducers/2fa-reducer";
import { loadData } from "shared/utils/localstorage";

import { ITwoFactorReducer } from "./2fa-reducer";

const initialCurrency = loadData(ACCOUNT_CURRENCY_KEY) || "BTC";

const accountCurrencyReducer = (
  currency: string = initialCurrency,
  action: any
): string => {
  if (action.type === UPDATE_ACCOUNT_SETTINGS) {
    return action.payload;
  }
  return currency;
};

export interface IAccountSettings {
  currency: string;
  twoFactorAuth: ITwoFactorReducer;
}

export default combineReducers<IAccountSettings>({
  currency: accountCurrencyReducer,
  twoFactorAuth: twoFactorReducer
});
