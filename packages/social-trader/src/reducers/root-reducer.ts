// import { connectRouter } from "connected-react-router";
import followDetailsReducer, {
  FollowDetailsState
} from "pages/follows/follow-details/reducers/follow-details.reducer";
import fundDetailsReducer, {
  FundDetailsState
} from "pages/funds/fund-details/reducers/fund-details.reducer";
import programDetailsReducer, {
  ProgramDetailsState
} from "pages/programs/program-details/reducers/program-details.reducer";
import passwordRestoreReducer from "shared/components/auth/forgot-password/reducers/password-restore-reducers";
import loginReducer from "shared/components/auth/signin/reducers/login.reducers";
import signUpReducer from "shared/components/auth/signup/reducers/signup.reducers";
import notificationsReducer, {
  NotificationsState
} from "shared/components/notifications/reducers/notifications.reducers";
import programsRatingReducer, {
  ProgramsRatingState
} from "shared/components/programs-rating/reducers/programs-rating.reducers";
import {
  CopyTradingAccountsReducer,
  CopyTradingAccountsState,
  walletReducer,
  WalletState
} from "shared/components/wallet/reducers/wallet.reducers";
import alertMessagesReducer, {
  AlertMessagesState
} from "shared/modules/alert-message/reducers/alert-message-reducers";
import followNotificationsReducer from "shared/modules/follow-notifications/reducers/follow-notifications.reducers";
import followsReducer, {
  FollowsListState
} from "shared/modules/follows-table/reducers/follows-table.reducers";
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
} from "shared/reducers/account-settings-reducer";
import authReducer, { AuthState } from "shared/reducers/auth-reducer";
import emailPendingReducer, {
  EmailPendingState
} from "shared/reducers/email-pending-reducer";
import headerReducer, { HeaderState } from "shared/reducers/header-reducer";
import platformReducer, {
  PlatformState
} from "shared/reducers/platform-reducer";
import profileReducer, { ProfileState } from "shared/reducers/profile-reducer";
import uiReducer, { IUiState } from "shared/reducers/ui-reducer";

export const sharedRootReducers = {
  profile: profileReducer,
  fundDetails: fundDetailsReducer,
  followDetails: followDetailsReducer,
  programDetails: programDetailsReducer,
  // router: connectRouter(history),
  platformData: platformReducer,
  followsData: followsReducer,
  programsData: programsReducer,
  programsRating: programsRatingReducer,
  fundsData: fundsReducer,
  loginData: loginReducer,
  signUpData: signUpReducer,
  authData: authReducer,
  passwordRestoreData: passwordRestoreReducer,
  alertMessages: alertMessagesReducer,
  profileHeader: headerReducer,
  emailPending: emailPendingReducer,
  notifications: notificationsReducer,
  notificationSettings: notificationSettingsReducer,
  followNotifications: followNotificationsReducer,
  programNotifications: programNotificationsReducer,
  fundNotifications: fundNotificationsReducer,
  // manager: managerReducer,
  wallet: walletReducer,
  // copyTradingAccounts: CopyTradingAccountsReducer, TODO
  accountSettings: accountSettingsReducer,
  ui: uiReducer
};

export type RootState = Readonly<{
  profile: ProfileState;
  fundDetails: FundDetailsState;
  followDetails: FollowDetailsState;
  programDetails: ProgramDetailsState;
  notifications: NotificationsState;
  profileHeader: HeaderState;
  notificationSettings: NotificationSettingsState;
  platformData: PlatformState;
  followsData: FollowsListState;
  programsData: ProgramsListState;
  programsRating: ProgramsRatingState;
  fundsData: FundsTableState;
  emailPending: EmailPendingState;
  followNotifications: ProgramNotificationsState;
  programNotifications: ProgramNotificationsState;
  fundNotifications: FundNotificationsState;
  authData: AuthState;
  // // router: RouterState;
  alertMessages: AlertMessagesState;
  accountSettings: AccountSettingsState;
  wallet: WalletState;
  // copyTradingAccounts: CopyTradingAccountsState;
  ui: IUiState;
}>;
