import { NotificationSettingList } from "gv-api-web";
import apiReducerFactory, {
  IApiState
} from "reducers/reducer-creators/api-reducer";
import { apiSelector } from "utils/selectors";

import { NOTIFICATION_SETTINGS } from "../actions/notification-settings.actions";

export type NotificationSettingsState = IApiState<NotificationSettingList>;

export const notificationSettingsSelector = apiSelector<
  NotificationSettingList
>(state => state.notificationSettings);

const notificationSettingsReducer = apiReducerFactory<NotificationSettingList>({
  apiType: NOTIFICATION_SETTINGS
});

export default notificationSettingsReducer;
