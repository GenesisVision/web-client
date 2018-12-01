import { ADD_NOTIFICATION_SETTINGS } from "../actions/notification-settings.actions";

const initialState = {
  settingsGeneral: [],
  settingsProgram: [],
  settingsManager: []
};

const notificationSettingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_NOTIFICATION_SETTINGS:
      return { ...action.settings };
    default:
      return state;
  }
};

export default notificationSettingsReducer;
