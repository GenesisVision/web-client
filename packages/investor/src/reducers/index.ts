import fundDepositReducer, {
  FundDepositState
} from "modules/fund-deposit/reducer/fund-deposit.reducer";
import headerReducer, {
  HeaderState
} from "modules/header/reducer/header-reducer";
import programDepositReducer, {
  ProgramsDepositState
} from "modules/program-deposit/reducer/program-deposit.reducer";
import notificationsReducer, {
  NotificationsState
} from "pages/app/components/notifications/reducers/notifications.reducers";
import passwordRestoreReducer, {
  PasswordState
} from "pages/auth/forgot-password/reducers/password-restore-reducers";
import loginReducer, {
  LoginState
} from "pages/auth/login/reducers/login.reducers";
import signUpReducer, {
  SignUpState
} from "pages/auth/signup/reducers/signup.reducers";
import dashboardReducer, {
  DashboardState
} from "pages/dashboard/reducers/dashboard.reducers";
import managerReducer, {
  ManagerState
} from "pages/manager/reducers/manager.reducers";
import { loadingBarReducer } from "react-redux-loading-bar";
import { RouterState, routerReducer } from "react-router-redux";
import { Reducer, combineReducers } from "redux";
import programsRatingReducer, {
  ProgramsRatingState
} from "shared/components/programs-rating/reducers/programs-rating.reducers";
import walletReducer, {
  WalletState
} from "shared/components/wallet/reducers/wallet.reducers";
import alertMessagesReducer, {
  AlertMessagesState
} from "shared/modules/alert-message/reducers/alert-message-reducers";
import fundNotificationsReducer, {
  FundNotificationsState
} from "shared/modules/fund-notifications/reducers/fund-notifications.reducers";
import fundsReducer, {
  FundsTableState
} from "shared/modules/funds-table/reducers/funds-table.reducers";
import notificationSettingsReducer, {
  NotificationSettingsState
} from "shared/modules/notification-settings/reducers/notification-settings.reducers";
import programNotificationsReducer, {
  ProgramNotificationsState
} from "shared/modules/program-notifications/reducers/program-notifications.reducers";
import programsReducer, {
  ProgramsListState
} from "shared/modules/programs-table/reducers/programs-table.reducers";
import accountSettingsReducer, {
  AccountSettingsState
} from "shared/reducers/account-settings";
import authReducer from "shared/reducers/auth-reducer";
import { AuthState } from "shared/reducers/auth-reducer";
import emailPendingReducer, {
  EmailPendingState
} from "shared/reducers/email-pending-reducer";
import platformReducer, {
  PlatformState
} from "shared/reducers/platform-reducer";
import uiReducer, { IUiState } from "shared/reducers/ui-reducer";
import { DeepReadonly } from "utility-types";

export type RootState = DeepReadonly<{
  notificationSettings: NotificationSettingsState;
  loadingBar: Reducer<any>;
  profileHeader: HeaderState;
  platformData: PlatformState;
  programsData: ProgramsListState;
  programsRating: ProgramsRatingState;
  programDeposit: ProgramsDepositState;
  fundsData: FundsTableState;
  fundDeposit: FundDepositState;
  emailPending: EmailPendingState;
  notifications: NotificationsState;
  programNotifications: ProgramNotificationsState;
  fundNotifications: FundNotificationsState;
  manager: ManagerState;
  signUpData: SignUpState;
  loginData: LoginState;
  authData: AuthState;
  routing: RouterState;
  passwordRestoreData: PasswordState;
  alertMessages: AlertMessagesState;
  dashboard: DashboardState;
  accountSettings: AccountSettingsState;
  wallet: WalletState;
  ui: IUiState;
}>;

const rootReducer = combineReducers<RootState>({
  routing: routerReducer,
  loadingBar: loadingBarReducer,
  platformData: platformReducer,
  programsData: programsReducer,
  programsRating: programsRatingReducer,
  fundsData: fundsReducer,
  loginData: loginReducer,
  signUpData: signUpReducer,
  authData: authReducer,
  passwordRestoreData: passwordRestoreReducer,
  alertMessages: alertMessagesReducer,
  profileHeader: headerReducer,
  dashboard: dashboardReducer,
  programDeposit: programDepositReducer,
  fundDeposit: fundDepositReducer,
  emailPending: emailPendingReducer,
  notifications: notificationsReducer,
  notificationSettings: notificationSettingsReducer,
  programNotifications: programNotificationsReducer,
  fundNotifications: fundNotificationsReducer,
  manager: managerReducer,
  wallet: walletReducer,
  accountSettings: accountSettingsReducer,
  ui: uiReducer
});

export default rootReducer;
