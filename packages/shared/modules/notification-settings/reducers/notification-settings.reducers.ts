import { NotificationSettingList } from "gv-api-web";

import { ADD_NOTIFICATION_SETTINGS } from "../actions/notification-settings.actions";

const initialState: NotificationSettingList = {
  settingsGeneral: [],
  settingsProgram: [],
  settingsManager: [],
  settingsFund: []
};

const notificationSettingsReducer = (
  state: NotificationSettingList = initialState,
  action
): NotificationSettingList => {
  switch (action.type) {
    case ADD_NOTIFICATION_SETTINGS:
      return { ...action.settings };
    default:
      return state;
  }
};

export default notificationSettingsReducer;
