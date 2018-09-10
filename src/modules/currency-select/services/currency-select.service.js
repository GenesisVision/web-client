import { updateAccountSettings } from "actions/account-settings-actions";

export const updateCurrentCurrency = currentCurrency => dispatch => {
  dispatch(updateAccountSettings({ currentCurrency }));
};
