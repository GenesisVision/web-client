import { ActionType, CurrencyEnum } from "shared/utils/types";

export const UPDATE_ACCOUNT_SETTINGS_CURRENCY =
  "UPDATE_ACCOUNT_SETTINGS_CURRENCY";

export const updateAccountSettingsCurrencyAction = (
  payload: CurrencyEnum
): ActionType<CurrencyEnum> => ({
  type: UPDATE_ACCOUNT_SETTINGS_CURRENCY,
  payload
});
