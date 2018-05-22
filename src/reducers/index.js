import { combineReducers } from "redux";
import { loadingBarReducer } from "react-redux-loading-bar";
import { routerReducer } from "react-router-redux";

import alertMessagesReducer from "../shared/modules/alert-message/reducers/alert-message-reducers";
import authReducer from "./auth-reducer";
import dashboardReducer from "../modules/dashboard/reducers/dashboard-reducers";
import emailConfirmReducer from "../modules/email-confirm/reducers/email-confirm-reducers";
import loginReducer from "../modules/login/reducers/login-reducers";
import passwordResetReducer from "../modules/password-reset/reducers/password-reset-reducers";
import platformReducer from "./platform-reducer";
import popupReducer from "../modules/popup/reducers/popup-reducers";
import profileReducer from "../modules/profile/reducers/profile-reducers";
import programDepositReducer from "../modules/program-deposit/reducers/trader-deposit-reducers";
import programReducer from "../modules/program/reducers/trader-reducers";
import programsReducer from "../modules/programs/reducers/programs-reducers";
import programWithdrawReducer from "../modules/program-withdraw/reducers/program-withdraw-reducers";
import registerReducer from "../modules/register/reducers/register-reducers";
import tournamentReducer from "../modules/tournament/reducers/tournament-reducers";
import walletReducer from "../modules/wallet/reducers/wallet-reducers";
import environmentReducer from "./environment-reducer";

export default combineReducers({
  environment: environmentReducer,
  routing: routerReducer,
  loadingBar: loadingBarReducer,
  platformData: platformReducer,
  tournamentData: tournamentReducer,
  programsData: programsReducer,
  programData: programReducer,
  loginData: loginReducer,
  registerData: registerReducer,
  authData: authReducer,
  emailConfirmData: emailConfirmReducer,
  passwordResetData: passwordResetReducer,
  alertMessages: alertMessagesReducer,
  profileData: profileReducer,
  walletData: walletReducer,
  dashboardData: dashboardReducer,
  programDepositData: programDepositReducer,
  programWithdrawData: programWithdrawReducer,
  popupData: popupReducer
});
