import { combineReducers } from "redux";
import {
  TUpdateAccountSettingsCurrencyAction,
  UPDATE_ACCOUNT_SETTINGS_CURRENCY
} from "shared/actions/account-settings-actions";
import { ACCOUNT_CURRENCY_KEY } from "shared/middlewares/update-account-settings-middleware/update-account-settings-middleware";
import twoFactorReducer from "shared/reducers/2fa-reducer";
import { getCookie } from "shared/utils/cookie";
import { CurrencyEnum } from "shared/utils/types";

import { fieldSelector } from "../utils/selectors";
import { ITwoFactorReducer } from "./2fa-reducer";
import defaultReducer from "./reducer-creators/default-reducer";

const initialState = (getCookie(ACCOUNT_CURRENCY_KEY) as CurrencyEnum) || "BTC";

export const currencySelector = fieldSelector(
  state => state.accountSettings.currency
);

const accountCurrencyReducer = (
  state: CurrencyEnum = initialState,
  action: TUpdateAccountSettingsCurrencyAction
): CurrencyEnum =>
  defaultReducer<TUpdateAccountSettingsCurrencyAction, CurrencyEnum>(
    action,
    state,
    initialState,
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
