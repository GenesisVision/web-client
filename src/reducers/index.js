import notificationsReducer from "pages/app/components/notifications/reducers/notifications.reducers";
import { loadingBarReducer } from "react-redux-loading-bar";
import { routerReducer } from "react-router-redux";
import { combineReducers } from "redux";

import navigationReducer from "../modules/navigation/reducers/navigation-reducers";
import popupReducer from "../modules/popup/reducers/popup-reducers";
import profileHeaderReducer from "../modules/profile-header/reducer/profile-header-reducer";
import profileReducer from "../modules/profile/reducers/profile-reducers";
import programDepositReducer from "../modules/program-deposit/reducers/trader-deposit-reducers";
import programSearchReducer from "../modules/program-search/reducers/program-search-reducers";
import programWithdrawReducer from "../modules/program-withdraw/reducers/program-withdraw-reducers";
import programsReducer from "../modules/programs-table/reducers/programs-table.reducers";
import emailConfirmReducer from "../pages/auth/email-confirm/reducers/email-confirm.reducers";
import passwordRestoreReducer from "../pages/auth/forgot-password/reducers/password-restore-reducers";
import loginReducer from "../pages/auth/login/reducers/login.reducers";
import signUpReducer from "../pages/auth/signup/reducers/signup.reducers";
import dashboardReducer from "../pages/dashboard/reducers/dashboard.reducers";
import programDetailsReducer from "../pages/programs/program-details/reducers/program-details.reducers.js";
import alertMessagesReducer from "../shared/modules/alert-message/reducers/alert-message-reducers";
import authReducer from "./auth-reducer";
import emailPendingReducer from "./email-pending-reducer";
import platformReducer from "./platform-reducer";

export default combineReducers({
  routing: routerReducer,
  loadingBar: loadingBarReducer,
  platformData: platformReducer,
  programSearchData: programSearchReducer,
  programsData: programsReducer,
  loginData: loginReducer,
  signUpData: signUpReducer,
  authData: authReducer,
  emailConfirmData: emailConfirmReducer,
  passwordRestoreData: passwordRestoreReducer,
  alertMessages: alertMessagesReducer,
  profileHeader: profileHeaderReducer,
  profileData: profileReducer,
  dashboard: dashboardReducer,
  programDepositData: programDepositReducer,
  programWithdrawData: programWithdrawReducer,
  popupData: popupReducer,
  navigationData: navigationReducer,
  emailPending: emailPendingReducer,
  programDetails: programDetailsReducer,
  notifications: notificationsReducer
});
