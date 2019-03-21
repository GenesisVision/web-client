import { Dispatch } from "redux";
import { updateAccountSettings } from "shared/actions/account-settings-actions";
import { ActionType } from "shared/utils/types";

import { CURRENCY_VALUES_ENUM } from "../currency-select.constants";

export const updateCurrency = (currency: CURRENCY_VALUES_ENUM) => (
  dispatch: Dispatch<ActionType>
) => {
  dispatch(updateAccountSettings(currency));
};
