import defaultReducer from "shared/reducers/reducer-creators/default-reducer";

import {
  NOTIFICATIONS_TOGGLE,
  NotificationToggleAction
} from "../actions/notifications.actions";

const initialState = false;
const isOpenReducer = (
  state: boolean = initialState,
  action: NotificationToggleAction
): boolean =>
  defaultReducer<NotificationToggleAction, boolean>(
    action,
    state,
    initialState,
    NOTIFICATIONS_TOGGLE
  );

export default isOpenReducer;
