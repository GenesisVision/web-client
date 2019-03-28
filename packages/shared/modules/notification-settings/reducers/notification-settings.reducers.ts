import { NotificationSettingList } from "gv-api-web";

import { ADD_NOTIFICATION_SETTINGS } from "../actions/notification-settings.actions";

export type NotificationSettingsState = Readonly<NotificationSettingList>;

const initialState: NotificationSettingsState = {
  settingsGeneral: [],
  settingsProgram: [],
  settingsManager: [],
  settingsFund: []
};

const notificationSettingsReducer = (
  state: NotificationSettingsState = initialState,
  action: any
): NotificationSettingsState => {
  switch (action.type) {
    case ADD_NOTIFICATION_SETTINGS:
      return { ...action.settings };
    default:
      return state;
  }
};

export default notificationSettingsReducer;
