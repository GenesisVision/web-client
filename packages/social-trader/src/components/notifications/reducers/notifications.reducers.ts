import {
  ADD_NOTIFICATIONS,
  AddNotificationsAction
} from "components/notifications/actions/notifications.actions";
import { NotificationViewModel } from "gv-api-web";
import defaultReducer from "reducers/reducer-creators/default-reducer";
import { combineReducers } from "redux";

const initialNotificationsState: NotificationViewModel[] = [];
// TODO: добавить нормализацию, когда буду уникальные ID
const addNotificationsReducer = (
  state: NotificationViewModel[] = initialNotificationsState,
  action: AddNotificationsAction
): NotificationViewModel[] =>
  defaultReducer<AddNotificationsAction, NotificationViewModel[]>(
    action,
    state,
    initialNotificationsState,
    ADD_NOTIFICATIONS,
    true
  );

export type NotificationsState = Readonly<{
  notifications: NotificationViewModel[];
}>;

const notificationsReducer = combineReducers<NotificationsState>({
  notifications: addNotificationsReducer
});

export default notificationsReducer;
