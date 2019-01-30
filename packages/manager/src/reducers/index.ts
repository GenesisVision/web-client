import { NotificationSettingList } from "gv-api-web";
import { IHeaderState } from "investor-web-portal/src/modules/header/reducer/header-reducer";
import assetEditReducer from "modules/asset-edit/reducer/asset-edit.reducer";
import fundDepositReducer from "modules/fund-deposit/reducer/fund-deposit.reducer";
import headerReducer from "modules/header/reducer/header-reducer";
import programDepositReducer from "modules/program-deposit/reducer/program-deposit.reducer";
import notificationsReducer from "pages/app/components/notifications/reducers/notifications.reducers";
import { loadingBarReducer } from "react-redux-loading-bar";
import { RouterState, routerReducer } from "react-router-redux";
import { combineReducers } from "redux";
import programsRatingReducer from "shared/components/programs-rating/reducers/programs-rating.reducers";
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

import { AuthState } from "../../../shared/reducers/auth-reducer";
import programSettingsReducer from "../modules/program-settings/reducers/program-settings-reducers";
import passwordRestoreReducer from "../pages/auth/forgot-password/reducers/password-restore-reducers";
import loginReducer from "../pages/auth/login/reducers/login.reducers";
import signUpReducer from "../pages/auth/signup/reducers/signup.reducers";
import dashboardReducer from "../pages/dashboard/reducers/dashboard.reducers";
import managerReducer from "../pages/manager/reducers/manager.reducers";

export interface RootState {
  notificationSettings: NotificationSettingList;
  profileHeader: IHeaderState;
  authData: AuthState;
  routing: RouterState;
}

export default combineReducers({
  dashboard: dashboardReducer,
  programNotifications: programNotificationsReducer,
  fundNotifications: fundNotificationsReducer,
  programDeposit: programDepositReducer,
  assetEdit: assetEditReducer,
  fundDeposit: fundDepositReducer,
  manager: managerReducer,
  programsData: programsReducer,
  programsRating: programsRatingReducer,
  fundsData: fundsReducer,
  routing: routerReducer,
  loadingBar: loadingBarReducer,
  platformData: platformReducer,
  alertMessages: alertMessagesReducer,
  loginData: loginReducer,
  signUpData: signUpReducer,
  authData: authReducer,
  profileHeader: headerReducer,
  programSettingsData: programSettingsReducer,
  passwordRestoreData: passwordRestoreReducer,
  notifications: notificationsReducer,
  accountSettings: accountSettingsReducer,
  ui: uiReducer,
  wallet: walletReducer,
  emailPending: emailPendingReducer,
  notificationSettings: notificationSettingsReducer
});
