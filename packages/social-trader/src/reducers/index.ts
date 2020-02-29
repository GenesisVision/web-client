import { LOGOUT } from "actions/auth-actions";
import { NotificationsState } from "components/notifications/reducers/notifications.reducers";
import { PasswordState } from "pages/auth/forgot-password/reducers/password-restore-reducers";
import { LoginState } from "pages/auth/signin/reducers/login.reducers";
import clearableReducer from "reducers/clearable.reducer";
import { combineReducers } from "redux";

import { RootState, sharedRootReducers } from "./root-reducer";

type State = {
  notifications: NotificationsState;
  loginData: LoginState;
  passwordRestoreData: PasswordState;
};

export type AuthRootState = RootState & State;

const rootReducer = clearableReducer(
  combineReducers<AuthRootState>(sharedRootReducers),
  LOGOUT
);

export default rootReducer;
