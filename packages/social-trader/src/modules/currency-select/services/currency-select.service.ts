import { updateAccountSettingsCurrencyAction } from "actions/account-settings-actions";
import { ACCOUNT_CURRENCY_KEY } from "middlewares/update-account-settings-middleware/update-account-settings-middleware";
import { Dispatch } from "redux";
import { setCookie } from "utils/cookie";
import { ActionType, CurrencyEnum } from "utils/types";

export const updateCurrency = (currency: CurrencyEnum) => (
  dispatch: Dispatch<ActionType>
) => {
  setCookie(ACCOUNT_CURRENCY_KEY, currency);
  dispatch(updateAccountSettingsCurrencyAction(currency));
};
