import { connectRouter } from "connected-react-router";
import passwordRestoreReducer, {
  PasswordState
} from "pages/auth/forgot-password/reducers/password-restore-reducers";
import signUpReducer, {
  SignUpState
} from "pages/auth/signup/reducers/signup.reducers";
import dashboardReducer, {
  ManagerDashboardState
} from "pages/dashboard/reducers/dashboard.reducers";
import managerReducer, {
  ManagerState
} from "pages/manager/reducers/manager.reducers";
import { combineReducers } from "redux";
import loginReducer, {
  LoginState
} from "shared/components/auth/login/reducers/login.reducers";
import notificationsReducer, {
  NotificationsState
} from "shared/components/notifications/reducers/notifications.reducers";
import programsRatingReducer from "shared/components/programs-rating/reducers/programs-rating.reducers";
import {
  CopyTradingAccountsReducer,
  walletReducer
} from "shared/components/wallet/reducers/wallet.reducers";
import alertMessagesReducer from "shared/modules/alert-message/reducers/alert-message-reducers";
import fundNotificationsReducer from "shared/modules/fund-notifications/reducers/fund-notifications.reducers";
import fundsReducer from "shared/modules/funds-table/reducers/funds-table.reducers";
import notificationSettingsReducer from "shared/modules/notification-settings/reducers/notification-settings.reducers";
import programNotificationsReducer from "shared/modules/program-notifications/reducers/program-notifications.reducers";
import programsReducer from "shared/modules/programs-table/reducers/programs-table.reducers";
import accountSettingsReducer from "shared/reducers/account-settings";
import authReducer from "shared/reducers/auth-reducer";
import emailPendingReducer from "shared/reducers/email-pending-reducer";
import headerReducer from "shared/reducers/header-reducer";
import platformReducer from "shared/reducers/platform-reducer";
import RootState from "shared/reducers/root-reducer";
import uiReducer from "shared/reducers/ui-reducer";
import history from "shared/utils/history";

type State = {
  notifications: NotificationsState;
  manager: ManagerState;
  signUpData: SignUpState;
  loginData: LoginState;
  passwordRestoreData: PasswordState;
  dashboard: ManagerDashboardState;
};

export type ManagerRootState = RootState & State;

export default combineReducers<ManagerRootState>({
  dashboard: dashboardReducer,
  programNotifications: programNotificationsReducer,
  fundNotifications: fundNotificationsReducer,
  manager: managerReducer,
  programsData: programsReducer,
  programsRating: programsRatingReducer,
  fundsData: fundsReducer,
  router: connectRouter(history),
  platformData: platformReducer,
  alertMessages: alertMessagesReducer,
  loginData: loginReducer,
  signUpData: signUpReducer,
  authData: authReducer,
  profileHeader: headerReducer,
  passwordRestoreData: passwordRestoreReducer,
  notifications: notificationsReducer,
  accountSettings: accountSettingsReducer,
  ui: uiReducer,
  wallet: walletReducer,
  copyTradingAccounts: CopyTradingAccountsReducer,
  emailPending: emailPendingReducer,
  notificationSettings: notificationSettingsReducer
});
