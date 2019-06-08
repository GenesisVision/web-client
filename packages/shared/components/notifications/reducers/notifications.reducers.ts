import { NotificationViewModel } from "gv-api-web";
import { combineReducers } from "redux";
import {
  ADD_NOTIFICATIONS,
  ADD_TOTAL_NOTIFICATIONS,
  AddNotificationsAction,
  AddTotalNotificationsAction,
  SET_NOTIFICATIONS_OPTIONS,
  SetNotificationsOptionsAction,
  TAKE_COUNT
} from "shared/components/notifications/actions/notifications.actions";
import defaultReducer from "shared/reducers/reducer-creators/default-reducer";

import isOpenReducer from "./is-open.reducer";

type SkipTake = {
  skip: number;
  take: number;
};

const initialState: NotificationViewModel[] = [];

const optionsReducer = (
  state: SkipTake = { take: TAKE_COUNT, skip: 0 } as SkipTake,
  action: SetNotificationsOptionsAction
) =>
  defaultReducer<SetNotificationsOptionsAction, SkipTake>(
    action,
    state,
    { take: TAKE_COUNT, skip: 0 },
    SET_NOTIFICATIONS_OPTIONS
  );

// TODO: добавить нормализацию, когда буду уникальные ID
const addNotificationsReducer = (
  state: NotificationViewModel[] = initialState,
  action: AddNotificationsAction
): NotificationViewModel[] =>
  defaultReducer<AddNotificationsAction, NotificationViewModel[]>(
    action,
    state,
    initialState,
    ADD_NOTIFICATIONS,
    true
  );

const addTotalCount = (
  state: number = 0,
  action: AddTotalNotificationsAction
): number =>
  defaultReducer<AddTotalNotificationsAction, number>(
    action,
    state,
    0,
    ADD_TOTAL_NOTIFICATIONS
  );

export type NotificationsState = Readonly<{
  notifications: NotificationViewModel[];
  isOpen: boolean;
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
