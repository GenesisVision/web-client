import {
  ADD_NOTIFICATIONS,
  AddNotificationsAction,
  SET_NOTIFICATIONS_OPTIONS,
  SetNotificationsOptionsAction,
  TAKE_COUNT
} from "components/notifications/actions/notifications.actions";
import { NotificationViewModel } from "gv-api-web";
import defaultReducer from "reducers/reducer-creators/default-reducer";
import { combineReducers } from "redux";

type SkipTake = {
  skip: number;
  take: number;
};

const initialOptionsState = { take: TAKE_COUNT, skip: 0 };
const optionsReducer = (
  state: SkipTake = initialOptionsState,
  action: SetNotificationsOptionsAction
) =>
  defaultReducer<SetNotificationsOptionsAction, SkipTake>(
    action,
    state,
    initialOptionsState,
    SET_NOTIFICATIONS_OPTIONS
  );

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
  options: SkipTake;
}>;

const notificationsReducer = combineReducers<NotificationsState>({
  notifications: addNotificationsReducer,
  options: optionsReducer
});

export default notificationsReducer;
