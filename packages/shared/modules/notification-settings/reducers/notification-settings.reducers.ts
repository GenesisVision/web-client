import { ADD_NOTIFICATION_SETTINGS } from "../actions/notification-settings.actions";
import { NotificationSettingList } from "gv-api-web";

const initialState = {
  settingsGeneral: [],
  settingsProgram: [],
  settingsManager: [],
  settingsFund: []
};

const notificationSettingsReducer = (
  state: NotificationSettingList = initialState,
  action
) => {
  switch (action.type) {
    case ADD_NOTIFICATION_SETTINGS:
      return { ...action.settings };
    default:
      return state;
  }
};

export default notificationSettingsReducer;
