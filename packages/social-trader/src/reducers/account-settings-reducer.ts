import {
  TUpdateAccountSettingsCurrencyAction,
  UPDATE_ACCOUNT_SETTINGS_CURRENCY
} from "actions/account-settings-actions";
import { ACCOUNT_CURRENCY_KEY } from "middlewares/update-account-settings-middleware/update-account-settings-middleware";
import twoFactorReducer from "reducers/2fa-reducer";
import { combineReducers } from "redux";
import { getCookie } from "utils/cookie";
import { fieldSelector } from "utils/selectors";
import { CurrencyEnum } from "utils/types";

import { ITwoFactorReducer } from "./2fa-reducer";
import defaultReducer from "./reducer-creators/default-reducer";

export const DEFAULT_ACCOUNT_CURRENCY: CurrencyEnum = "USD";
export const initialAccountCurrencyState =
  (getCookie(ACCOUNT_CURRENCY_KEY) as CurrencyEnum) || DEFAULT_ACCOUNT_CURRENCY;

export const currencySelector = fieldSelector(
  state => state.accountSettings.currency
);

const accountCurrencyReducer = (
  state: CurrencyEnum = initialAccountCurrencyState,
  action: TUpdateAccountSettingsCurrencyAction
): CurrencyEnum =>
  defaultReducer<TUpdateAccountSettingsCurrencyAction, CurrencyEnum>(
    action,
    state,
    initialAccountCurrencyState,
    UPDATE_ACCOUNT_SETTINGS_CURRENCY
  );

export type AccountSettingsState = Readonly<{
  currency: CurrencyEnum;
  twoFactorAuth: ITwoFactorReducer;
}>;

export default combineReducers<AccountSettingsState>({
  currency: accountCurrencyReducer,
  twoFactorAuth: twoFactorReducer
});
