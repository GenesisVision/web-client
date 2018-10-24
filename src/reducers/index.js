import fundDepositReducer from "modules/fund-deposit/reducer/fund-deposit.reducer";
import headerReducer from "modules/header/reducer/header-reducer";
import notificationSettingsReducer from "modules/notification-settings/reducers/notification-settings.reducers";
import programDepositReducer from "modules/program-deposit/reducer/program-deposit.reducer";
import programNotificationsReducer from "modules/program-notifications/reducers/program-notifications.reducers";
import fundNotificationsReducer from "modules/fund-notifications/reducers/fund-notifications.reducers";
import notificationsReducer from "pages/app/components/notifications/reducers/notifications.reducers";
import { loadingBarReducer } from "react-redux-loading-bar";
import { routerReducer } from "react-router-redux";
import accountSettingsReducer from "reducers/account-settings";
import uiReducer from "reducers/ui-reducer";
import { combineReducers } from "redux";

import fundsReducer from "../modules/funds-table/reducers/funds-table.reducers";
import programWithdrawReducer from "../modules/program-withdraw/reducer/program-withdraw.reducer";
import programsReducer from "../modules/programs-table/reducers/programs-table.reducers";
import passwordRestoreReducer from "../pages/auth/forgot-password/reducers/password-restore-reducers";
import loginReducer from "../pages/auth/login/reducers/login.reducers";
import signUpReducer from "../pages/auth/signup/reducers/signup.reducers";
import dashboardReducer from "../pages/dashboard/reducers/dashboard.reducers";
import managerReducer from "../pages/manager/reducers/manager.reducers";
import walletReducer from "../pages/wallet/reducers/wallet.reducers.js";
import alertMessagesReducer from "../shared/modules/alert-message/reducers/alert-message-reducers";
import authReducer from "./auth-reducer";
import emailPendingReducer from "./email-pending-reducer";
import platformReducer from "./platform-reducer";

export default combineReducers({
  routing: routerReducer,
  loadingBar: loadingBarReducer,
  platformData: platformReducer,
  programsData: programsReducer,
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
