import { NotificationSettingList } from "gv-api-web";
import fundDepositReducer, {
  IFundDepositReducer
} from "modules/fund-deposit/reducer/fund-deposit.reducer";
import headerReducer, {
  IHeaderReducer
} from "modules/header/reducer/header-reducer";
import programDepositReducer, {
  IProgramsDepositReducer
} from "modules/program-deposit/reducer/program-deposit.reducer";
import notificationsReducer from "pages/app/components/notifications/reducers/notifications.reducers";
import passwordRestoreReducer, {
  IPasswordRestoreReducers
} from "pages/auth/forgot-password/reducers/password-restore-reducers";
import loginReducer, {
  ILoginReducer
} from "pages/auth/login/reducers/login.reducers";
import signUpReducer, {
  ISignUpReducer
} from "pages/auth/signup/reducers/signup.reducers";
import dashboardReducer, {
  IDashboard
} from "pages/dashboard/reducers/dashboard.reducers";
import managerReducer from "pages/manager/reducers/manager.reducers";
import { loadingBarReducer } from "react-redux-loading-bar";
import { RouterState, routerReducer } from "react-router-redux";
import { Reducer, combineReducers } from "redux";
import programsRatingReducer, {
  IProgramsRatingReducer
} from "shared/components/programs-rating/reducers/programs-rating.reducers";
import walletReducer, {
  IWalletReducer
} from "shared/components/wallet/reducers/wallet.reducers";
import alertMessagesReducer, {
  IAlertMessagesReducer
} from "shared/modules/alert-message/reducers/alert-message-reducers";
import fundNotificationsReducer from "shared/modules/fund-notifications/reducers/fund-notifications.reducers";
import fundsReducer, {
  IFundsTableReducer
} from "shared/modules/funds-table/reducers/funds-table.reducers";
import notificationSettingsReducer from "shared/modules/notification-settings/reducers/notification-settings.reducers";
import programNotificationsReducer from "shared/modules/program-notifications/reducers/program-notifications.reducers";
import programsReducer, {
  IProgramsReducer
} from "shared/modules/programs-table/reducers/programs-table.reducers";
import accountSettingsReducer from "shared/reducers/account-settings";
import authReducer from "shared/reducers/auth-reducer";
import { IAuthReducer } from "shared/reducers/auth-reducer";
import emailPendingReducer, {
  IEmailPendingStore
} from "shared/reducers/email-pending-reducer";
import platformReducer, {
  IPlatformReducer
} from "shared/reducers/platform-reducer";
import uiReducer from "shared/reducers/ui-reducer";

import { IAccountSettings } from "../../../shared/reducers/account-settings";

export interface IState {
  notificationSettings: NotificationSettingList;
  loadingBar: Reducer<any>;
  profileHeader: IHeaderReducer;
  platformData: IPlatformReducer;
  programsData: IProgramsReducer;
  programsRating: IProgramsRatingReducer;
  programDeposit: IProgramsDepositReducer;
  fundsData: IFundsTableReducer;
  fundDeposit: IFundDepositReducer;
  emailPending: IEmailPendingStore;
  signUpData: ISignUpReducer;
  loginData: ILoginReducer;
  authData: IAuthReducer;
  routing: RouterState;
  passwordRestoreData: IPasswordRestoreReducers;
  alertMessages: IAlertMessagesReducer;
  dashboard: IDashboard;
  accountSettings: IAccountSettings;
  wallet: IWalletReducer;
}

const rootReducer = combineReducers({
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
