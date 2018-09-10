import { UPDATE_ACCOUNT_SETTINGS } from "actions/account-settings-actions";
import { saveData } from "utils/localstorage";

export const ACCOUNT_SETTINGS_KEY = "accountSettings";

export const updateAccountSettingsMiddleware = store => next => action => {
  if (action.type === UPDATE_ACCOUNT_SETTINGS) {
    saveData(ACCOUNT_SETTINGS_KEY, {
      ...store.getState()[ACCOUNT_SETTINGS_KEY],
      ...action.payload
    });
  }
  return next(action);
};
