import { LOGOUT } from "actions/auth-actions";
import { PasswordState } from "components/auth/forgot-password/reducers/password-restore-reducers";
import { LoginState } from "components/auth/signin/reducers/login.reducers";
import { SignUpState } from "components/auth/signup/reducers/signup.reducers";
//import { ManagerState } from "components/manager/reducers/manager.reducers";
import { NotificationsState } from "components/notifications/reducers/notifications.reducers";
import clearableReducer from "reducers/clearable.reducer";
import { combineReducers } from "redux";

import { RootState, sharedRootReducers } from "./root-reducer";

type State = {
  notifications: NotificationsState;
  //manager: ManagerState;
  signUpData: SignUpState;
  loginData: LoginState;
  passwordRestoreData: PasswordState;
  //dashboard: ManagerDashboardState;
};

export type AuthRootState = RootState & State;

const rootReducer = clearableReducer(
  combineReducers<AuthRootState>({
    //dashboard: dashboardReducer, TODO
    ...sharedRootReducers
  }),
  LOGOUT
);

export default rootReducer;
