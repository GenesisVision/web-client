import { UPDATE_ACCOUNT_SETTINGS } from "actions/account-settings-actions";
import { ACCOUNT_SETTINGS_KEY } from "shared/middlewares/update-account-settings-middleware/update-account-settings-middleware";
import { loadData } from "utils/localstorage";

const accountSettings = loadData(ACCOUNT_SETTINGS_KEY) || {
  currentCurrency: "GVT"
};

const accountSettingsReducer = (state = accountSettings, action) => {
  if (action.type === UPDATE_ACCOUNT_SETTINGS) {
    return { ...state, ...action.payload };
  }
  return state;
};

export default accountSettingsReducer;
