import profileHeaderReducer from "modules/profile-header/reducer/profile-header-reducer";
import { loadingBarReducer } from "react-redux-loading-bar";
import { routerReducer } from "react-router-redux";
import { combineReducers } from "redux";

import dashboardReducer from "../modules/dashboard/reducers/dashboard-reducers";
import emailConfirmReducer from "../modules/email-confirm/reducers/email-confirm-reducers";
import loginReducer from "../modules/login/reducers/login-reducers";
import navigationReducer from "../modules/navigation/reducers/navigation-reducers";
import passwordRestoreReducer from "../modules/password-restore/reducers/password-restore-reducers";
import popupReducer from "../modules/popup/reducers/popup-reducers";
import profileReducer from "../modules/profile/reducers/profile-reducers";
import programDepositReducer from "../modules/program-deposit/reducers/trader-deposit-reducers";
import programSearchReducer from "../modules/program-search/reducers/program-search-reducers";
import programWithdrawReducer from "../modules/program-withdraw/reducers/program-withdraw-reducers";
import programReducer from "../modules/program/reducers/trader-reducers";
import programsReducer from "../modules/programs/reducers/programs-reducers";
import signUpReducer from "../modules/signup/reducers/signup-reducers";
import walletReducer from "../modules/wallet/reducers/wallet-reducers";
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
