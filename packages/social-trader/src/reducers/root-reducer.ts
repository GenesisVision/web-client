import {
  globalSearchReducer,
  GlobalSearchState
} from "components/global-search/reducers/global-search.reducer";
import alertMessagesReducer, {
  AlertMessagesState
} from "modules/alert-message/reducers/alert-message-reducers";
import followsReducer, {
  FollowsListState
} from "modules/follows-table/reducers/follows-table.reducers";
import fundsReducer, {
  FundsTableState
} from "modules/funds-table/reducers/funds-table.reducers";
import programsReducer, {
  ProgramsListState
} from "modules/programs-table/reducers/programs-table.reducers";
import accountDetailsReducer, {
  AccountDetailsState
} from "pages/accounts/account-details/reducers/account-details.reducer";
import dashboardReducer, {
  DashboardState
} from "pages/dashboard/reducers/dashboard.reducers";
import followDetailsReducer, {
  FollowDetailsState
} from "pages/invest/follows/follow-details/reducers/follow-details.reducer";
import fundDetailsReducer, {
  FundDetailsState
} from "pages/invest/funds/fund-details/reducers/fund-details.reducer";
import programDetailsReducer, {
  ProgramDetailsState
} from "pages/invest/programs/program-details/reducers/program-details.reducer";
import {
  walletReducer,
  WalletState
} from "pages/wallet/reducers/wallet.reducers";
import accountSettingsReducer, {
  AccountSettingsState
} from "reducers/account-settings-reducer";
import authReducer, { AuthState } from "reducers/auth-reducer";
import headerReducer, { HeaderState } from "reducers/header-reducer";
import platformReducer, { PlatformState } from "reducers/platform-reducer";
import tablesViewReducer, {
  TablesViewState
} from "reducers/tables-view-reducer";

export const sharedRootReducers = {
  globalSearch: globalSearchReducer,
  tablesView: tablesViewReducer,
  dashboard: dashboardReducer,
  accountDetails: accountDetailsReducer,
  fundDetails: fundDetailsReducer,
  followDetails: followDetailsReducer,
  programDetails: programDetailsReducer,
  platformData: platformReducer,
  followsData: followsReducer,
  programsData: programsReducer,
  fundsData: fundsReducer,
  authData: authReducer,
  alertMessages: alertMessagesReducer,
  profileHeader: headerReducer,
  wallet: walletReducer,
  accountSettings: accountSettingsReducer
};

export type RootState = Readonly<{
  globalSearch: GlobalSearchState;
  tablesView: TablesViewState;
  dashboard: DashboardState;
  accountDetails: AccountDetailsState;
  fundDetails: FundDetailsState;
  followDetails: FollowDetailsState;
  programDetails: ProgramDetailsState;
  profileHeader: HeaderState;
  platformData: PlatformState;
  followsData: FollowsListState;
  programsData: ProgramsListState;
  fundsData: FundsTableState;
  authData: AuthState;
  alertMessages: AlertMessagesState;
  accountSettings: AccountSettingsState;
  wallet: WalletState;
}>;
