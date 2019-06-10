import { NotificationSettingList } from "gv-api-web";
import apiReducerFactory, {
  IApiState
} from "shared/reducers/reducer-creators/api-reducer";

import { NOTIFICATION_SETTINGS } from "../actions/notification-settings.actions";

export type NotificationSettingsState = IApiState<NotificationSettingList>;

const notificationSettingsReducer = apiReducerFactory<NotificationSettingList>({
  apiType: NOTIFICATION_SETTINGS
});

export default notificationSettingsReducer;
