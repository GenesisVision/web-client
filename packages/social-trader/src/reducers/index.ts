import { LOGOUT } from "actions/auth-actions";
import { NotificationsState } from "components/notifications/reducers/notifications.reducers";
import clearableReducer from "reducers/clearable.reducer";
import { combineReducers } from "redux";

import { RootState, sharedRootReducers } from "./root-reducer";

type State = {
  notifications: NotificationsState;
};

export type AuthRootState = RootState & State;

const rootReducer = clearableReducer(
  combineReducers<AuthRootState>(sharedRootReducers),
  LOGOUT
);

export default rootReducer;
