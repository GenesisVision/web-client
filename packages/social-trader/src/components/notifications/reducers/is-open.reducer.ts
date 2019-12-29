import defaultReducer from "reducers/reducer-creators/default-reducer";

import {
  NOTIFICATIONS_TOGGLE,
  NotificationToggleAction
} from "../actions/notifications.actions";

export type IsOpenState = boolean;

const initialState = false;
const isOpenReducer = (
  state: IsOpenState = initialState,
  action: NotificationToggleAction
): boolean =>
  defaultReducer<NotificationToggleAction, boolean>(
    action,
    state,
    initialState,
    NOTIFICATIONS_TOGGLE
  );

export default isOpenReducer;
