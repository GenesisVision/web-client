import { DEFAULT_ACCOUNT_CURRENCY } from "reducers/account-settings-reducer";
import { ActionType, CurrencyEnum } from "utils/types";

export const UPDATE_ACCOUNT_SETTINGS_CURRENCY =
  "UPDATE_ACCOUNT_SETTINGS_CURRENCY";

export type TUpdateAccountSettingsCurrencyAction = ActionType<CurrencyEnum>;
export const updateAccountSettingsCurrencyAction = (
  payload: CurrencyEnum = DEFAULT_ACCOUNT_CURRENCY
): TUpdateAccountSettingsCurrencyAction => ({
  type: UPDATE_ACCOUNT_SETTINGS_CURRENCY,
  payload
});
