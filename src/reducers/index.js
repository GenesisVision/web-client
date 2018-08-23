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
import programReducer from "../modules/program/reducers/trader-reducers";
import programsReducer from "../modules/programs-table/reducers/programs-table.reducers";
import walletReducer from "../modules/wallet/reducers/wallet-reducers";
import emailConfirmReducer from "../pages/auth/email-confirm/reducers/email-confirm.reducers";
import loginReducer from "../pages/auth/login/reducers/login.reducers";
import passwordRestoreReducer from "../pages/auth/password-restore/reducers/password-restore-reducers";
import signUpReducer from "../pages/auth/signup/reducers/signup.reducers";
import dashboardReducer from "../pages/dashboard/reducers/dashboard.reducers";
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
  programData: programReducer,
  loginData: loginReducer,
  signUpData: signUpReducer,
  authData: authReducer,
  emailConfirmData: emailConfirmReducer,
  passwordRestoreData: passwordRestoreReducer,
  alertMessages: alertMessagesReducer,
  profileHeader: profileHeaderReducer,
  profileData: profileReducer,
  walletData: walletReducer,
  dashboardData: dashboardReducer,
  programDepositData: programDepositReducer,
  programWithdrawData: programWithdrawReducer,
  popupData: popupReducer,
  navigationData: navigationReducer,
  emailPending: emailPendingReducer
});
