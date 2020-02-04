import { updateAccountSettingsCurrencyAction } from "actions/account-settings-actions";
import { Dispatch } from "redux";
import { ActionType, CurrencyEnum } from "utils/types";

export const updateCurrency = (currency: CurrencyEnum) => (
  dispatch: Dispatch<ActionType>
) => {
  dispatch(updateAccountSettingsCurrencyAction(currency));
};
