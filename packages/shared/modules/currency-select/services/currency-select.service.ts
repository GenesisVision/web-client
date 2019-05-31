import { Dispatch } from "redux";
import { updateAccountSettingsCurrency } from "shared/actions/account-settings-actions";
import { ActionType, CurrencyEnum } from "shared/utils/types";

export const updateCurrency = (currency: CurrencyEnum) => (
  dispatch: Dispatch<ActionType>
) => {
  dispatch(updateAccountSettingsCurrency(currency));
};
