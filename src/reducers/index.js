import headerReducer from "modules/header/reducer/header-reducer";
import programDepositReducer from "modules/program-deposit/reducer/program-deposit.reducer";
import notificationsReducer from "pages/app/components/notifications/reducers/notifications.reducers";
import { loadingBarReducer } from "react-redux-loading-bar";
import { routerReducer } from "react-router-redux";
import accountSettingsReducer from "reducers/account-settings";
import { combineReducers } from "redux";

import navigationReducer from "../modules/navigation/reducers/navigation-reducers";
import profileReducer from "../modules/profile/reducers/profile-reducers";
import programWithdrawReducer from "../modules/program-withdraw/reducer/program-withdraw.reducer";
import programsReducer from "../modules/programs-table/reducers/programs-table.reducers";
import emailConfirmReducer from "../pages/auth/email-confirm/reducers/email-confirm.reducers";
import passwordRestoreReducer from "../pages/auth/forgot-password/reducers/password-restore-reducers";
import loginReducer from "../pages/auth/login/reducers/login.reducers";
import signUpReducer from "../pages/auth/signup/reducers/signup.reducers";
import dashboardReducer from "../pages/dashboard/reducers/dashboard.reducers";
import managerReducer from "../pages/manager/reducers/manager.reducers";
import programDetailsReducer from "../pages/programs/program-details/reducers/program-details.reducers.js";
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
  loginData: loginReducer,
  signUpData: signUpReducer,
  authData: authReducer,
  emailConfirmData: emailConfirmReducer,
  passwordRestoreData: passwordRestoreReducer,
  alertMessages: alertMessagesReducer,
  profileHeader: headerReducer,
  profileData: profileReducer,
  dashboard: dashboardReducer,
  programDeposit: programDepositReducer,
  programWithdraw: programWithdrawReducer,
  navigationData: navigationReducer,
  emailPending: emailPendingReducer,
  programDetails: programDetailsReducer,
  notifications: notificationsReducer,
  manager: managerReducer,
  wallet: walletReducer,
  accountSettings: accountSettingsReducer
});
