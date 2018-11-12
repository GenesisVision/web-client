import {
  addNotificationSetting,
  addNotificationSettings,
  fetchNotificationSettings,
  removeNotificationSetting
} from "modules/notification-settings/actions/notification-settings.actions";

export const fetchNotificationSettingsService = () => dispatch => {
  return dispatch(fetchNotificationSettings()).then(data =>
    dispatch(addNotificationSettings(data.value))
  );
};

export const removeNotificationSettingService = id => dispatch => {
  return dispatch(removeNotificationSetting(id)).then(() =>
    dispatch(fetchNotificationSettingsService())
  );
};

export const addNotificationSettingService = opts => dispatch => {
  return dispatch(addNotificationSetting(opts)).then(() =>
    dispatch(fetchNotificationSettingsService())
  );
};
