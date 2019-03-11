import { updateAccountSettings } from "shared/actions/account-settings-actions";
import { CURRENCY_VALUES_ENUM } from "../currency-select.constants";
import { Dispatch } from "redux";
import { ActionType } from "shared/utils/types";

export const updateCurrency = (currency: CURRENCY_VALUES_ENUM) => (dispatch: Dispatch<ActionType>) => {
  dispatch(updateAccountSettings(currency));
};
