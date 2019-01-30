import { NotificationSettingList } from "gv-api-web";

import {
  ADD_NOTIFICATION_SETTINGS,
  IAddNotificationSettings
} from "../actions/notification-settings.actions";

const initialState = {
  settingsGeneral: [],
  settingsProgram: [],
  settingsManager: [],
  settingsFund: []
};

const notificationSettingsReducer = (
  state: NotificationSettingList = initialState,
  action: IAddNotificationSettings
) => {
  switch (action.type) {
    case ADD_NOTIFICATION_SETTINGS:
      return { ...action.settings };
    default:
      return state;
  }
};

export default notificationSettingsReducer;
