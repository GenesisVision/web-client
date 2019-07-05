import dashboardReducer, {
  ManagerDashboardState
} from "pages/dashboard/reducers/dashboard.reducers";
import { combineReducers } from "redux";
import { LOGOUT } from "shared/actions/auth-actions";
import { PasswordState } from "shared/components/auth/forgot-password/reducers/password-restore-reducers";
import { LoginState } from "shared/components/auth/signin/reducers/login.reducers";
import { SignUpState } from "shared/components/auth/signup/reducers/signup.reducers";
import { ManagerState } from "shared/components/manager/reducers/manager.reducers";
import { NotificationsState } from "shared/components/notifications/reducers/notifications.reducers";
import clearableReducer from "shared/reducers/clearable.reducer";
import { RootState, sharedRootReducers } from "shared/reducers/root-reducer";

type State = {
  notifications: NotificationsState;
  manager: ManagerState;
  signUpData: SignUpState;
  loginData: LoginState;
  passwordRestoreData: PasswordState;
  dashboard: ManagerDashboardState;
};

export type ManagerRootState = RootState & State;

const rootReducer = clearableReducer(
  combineReducers<ManagerRootState>({
    dashboard: dashboardReducer,
    ...sharedRootReducers
  }),
  LOGOUT
);

export default rootReducer;
