import copytradingTablesReducer, {
  CopytradingTablesState
} from "modules/copytrading-tables/reducers/copytrading-tables.reducer";
import dashboardReducer, {
  DashboardState
} from "pages/dashboard/reducers/dashboard.reducers";
import { combineReducers } from "redux";
import { LOGOUT } from "shared/actions/auth-actions";
import { PasswordState } from "shared/components/auth/forgot-password/reducers/password-restore-reducers";
import { LoginState } from "shared/components/auth/login/reducers/login.reducers";
import { SignUpState } from "shared/components/auth/signup/reducers/signup.reducers";
import { ManagerState } from "shared/components/manager/reducers/manager.reducers";
import clearableReducer from "shared/reducers/clearable.reducer";
import { RootState, sharedRootReducers } from "shared/reducers/root-reducer";

type State = {
  manager: ManagerState;
  signUpData: SignUpState;
  loginData: LoginState;
  passwordRestoreData: PasswordState;
  dashboard: DashboardState;
  copytradingTables: CopytradingTablesState;
};

export type InvestorRootState = State & RootState;

const rootReducer = clearableReducer(
  combineReducers<InvestorRootState>({
    dashboard: dashboardReducer,
    copytradingTables: copytradingTablesReducer,
    ...sharedRootReducers
  }),
  LOGOUT
);

export default rootReducer;
