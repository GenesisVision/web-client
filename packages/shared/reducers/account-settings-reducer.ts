import { combineReducers } from "redux";
import {
  TUpdateAccountSettingsCurrencyAction,
  UPDATE_ACCOUNT_SETTINGS_CURRENCY
} from "shared/actions/account-settings-actions";
import twoFactorReducer from "shared/reducers/2fa-reducer";
import { CurrencyEnum } from "shared/utils/types";

import { fieldSelector } from "../utils/selectors";
import { ITwoFactorReducer } from "./2fa-reducer";
import defaultReducer from "./reducer-creators/default-reducer";

const initialState = "BTC";

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
