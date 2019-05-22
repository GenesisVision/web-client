import { combineReducers } from "redux";
import { UPDATE_ACCOUNT_SETTINGS } from "shared/actions/account-settings-actions";
import { ACCOUNT_CURRENCY_KEY } from "shared/middlewares/update-account-settings-middleware/update-account-settings-middleware";
import twoFactorReducer from "shared/reducers/2fa-reducer";
import { loadData } from "shared/utils/localstorage";
import { CurrencyEnum } from "shared/utils/types";

import { ITwoFactorReducer } from "./2fa-reducer";

const initialCurrency = (loadData(ACCOUNT_CURRENCY_KEY) as CurrencyEnum) || "BTC";

const accountCurrencyReducer = (
  currency: CurrencyEnum = initialCurrency,
  action: any
): CurrencyEnum => {
  if (action.type === UPDATE_ACCOUNT_SETTINGS) {
    return action.payload;
  }
  return currency;
};

export type AccountSettingsState = Readonly<{
  currency: CurrencyEnum;
  twoFactorAuth: ITwoFactorReducer;
}>;

export default combineReducers<AccountSettingsState>({
  currency: accountCurrencyReducer,
  twoFactorAuth: twoFactorReducer
});
