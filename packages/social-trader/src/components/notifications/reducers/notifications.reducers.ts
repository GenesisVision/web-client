import {
  ADD_NOTIFICATIONS,
  ADD_TOTAL_NOTIFICATIONS,
  AddNotificationsAction,
  AddTotalNotificationsAction,
  SET_NOTIFICATIONS_OPTIONS,
  SetNotificationsOptionsAction,
  TAKE_COUNT
} from "components/notifications/actions/notifications.actions";
import { NotificationViewModel } from "gv-api-web";
import defaultReducer from "reducers/reducer-creators/default-reducer";
import { combineReducers } from "redux";

import isOpenReducer, { IsOpenState } from "./is-open.reducer";

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

const initialCountState = 0;
const addTotalCount = (
  state: number = initialCountState,
  action: AddTotalNotificationsAction
): number =>
  defaultReducer<AddTotalNotificationsAction, number>(
    action,
    state,
    initialCountState,
    ADD_TOTAL_NOTIFICATIONS
  );

export type NotificationsState = Readonly<{
  notifications: NotificationViewModel[];
  isOpen: IsOpenState;
  total: number;
  options: SkipTake;
}>;

const notificationsReducer = combineReducers<NotificationsState>({
  notifications: addNotificationsReducer,
  isOpen: isOpenReducer,
  options: optionsReducer,
  total: addTotalCount
});

export default notificationsReducer;
