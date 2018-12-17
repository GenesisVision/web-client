import fundDepositReducer from "../modules/fund-deposit/reducer/fund-deposit.reducer";
import headerReducer, {
  IHeaderReducer
} from "../modules/header/reducer/header-reducer";
import programDepositReducer from "../modules/program-deposit/reducer/program-deposit.reducer";
import notificationsReducer from "../pages/app/components/notifications/reducers/notifications.reducers";
import { loadingBarReducer } from "react-redux-loading-bar";
import { routerReducer } from "react-router-redux";
import { combineReducers } from "redux";
import walletReducer from "shared/components/wallet/reducers/wallet.reducers";
import alertMessagesReducer from "shared/modules/alert-message/reducers/alert-message-reducers";
import fundNotificationsReducer from "shared/modules/fund-notifications/reducers/fund-notifications.reducers";
import fundsReducer from "shared/modules/funds-table/reducers/funds-table.reducers";
import notificationSettingsReducer from "shared/modules/notification-settings/reducers/notification-settings.reducers";
import programNotificationsReducer from "shared/modules/program-notifications/reducers/program-notifications.reducers";
import programsReducer from "shared/modules/programs-table/reducers/programs-table.reducers";
import accountSettingsReducer from "shared/reducers/account-settings";
import authReducer from "shared/reducers/auth-reducer";
import emailPendingReducer from "shared/reducers/email-pending-reducer";
import platformReducer from "shared/reducers/platform-reducer";
import uiReducer from "shared/reducers/ui-reducer";

import fundWithdrawReducer from "../modules/fund-withdraw/reducer/fund-withdraw.reducer";
import programWithdrawReducer from "../modules/program-withdraw/reducer/program-withdraw.reducer";
import passwordRestoreReducer from "../pages/auth/forgot-password/reducers/password-restore-reducers";
import loginReducer from "../pages/auth/login/reducers/login.reducers";
import signUpReducer from "../pages/auth/signup/reducers/signup.reducers";
import dashboardReducer from "../pages/dashboard/reducers/dashboard.reducers";
import managerReducer from "../pages/manager/reducers/manager.reducers";
import programsRatingReducer from "shared/components/programs-rating/reducers/programs-rating.reducers";
import { NotificationSettingList } from "gv-api-web";
import { IAuthReducer } from "../../../shared/reducers/auth-reducer";

export interface IState {
  notificationSettings: NotificationSettingList;
  profileHeader: IHeaderReducer;
  authData: IAuthReducer;
}

export default combineReducers({
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
  programWithdraw: programWithdrawReducer,
  fundWithdraw: fundWithdrawReducer,
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
