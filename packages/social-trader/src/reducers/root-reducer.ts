import alertMessagesReducer, {
  AlertMessagesState
} from "modules/alert-message/reducers/alert-message-reducers";
import accountDetailsReducer, {
  AccountDetailsState
} from "pages/accounts/account-details/reducers/account-details.reducer";
import assetsReducer, {
  AssetsState
} from "pages/invest/assets/reducers/assets.reducer";
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
import authReducer, { AuthState } from "reducers/auth-reducer";
import headerReducer, { HeaderState } from "reducers/header-reducer";
import platformReducer, { PlatformState } from "reducers/platform-reducer";

export const sharedRootReducers = {
  accountDetails: accountDetailsReducer,
  fundDetails: fundDetailsReducer,
  followDetails: followDetailsReducer,
  programDetails: programDetailsReducer,
  platformData: platformReducer,
  authData: authReducer,
  alertMessages: alertMessagesReducer,
  profileHeader: headerReducer,
  wallet: walletReducer,
  assets: assetsReducer
};

export type RootState = Readonly<{
  accountDetails: AccountDetailsState;
  fundDetails: FundDetailsState;
  followDetails: FollowDetailsState;
  programDetails: ProgramDetailsState;
  profileHeader: HeaderState;
  platformData: PlatformState;
  authData: AuthState;
  alertMessages: AlertMessagesState;
  wallet: WalletState;
  assets: AssetsState;
}>;
