import { RouterState } from "react-router-redux";
import { Reducer } from "redux";
import { ProgramsRatingState } from "shared/components/programs-rating/reducers/programs-rating.reducers";
import { WalletState } from "shared/components/wallet/reducers/wallet.reducers";
import { AlertMessagesState } from "shared/modules/alert-message/reducers/alert-message-reducers";
import { FundNotificationsState } from "shared/modules/fund-notifications/reducers/fund-notifications.reducers";
import { FundsTableState } from "shared/modules/funds-table/reducers/funds-table.reducers";
import { NotificationSettingsState } from "shared/modules/notification-settings/reducers/notification-settings.reducers";
import { ProgramNotificationsState } from "shared/modules/program-notifications/reducers/program-notifications.reducers";
import { ProgramsListState } from "shared/modules/programs-table/reducers/programs-table.reducers";
import { AccountSettingsState } from "shared/reducers/account-settings";
import { AuthState } from "shared/reducers/auth-reducer";
import { EmailPendingState } from "shared/reducers/email-pending-reducer";
import { PlatformState } from "shared/reducers/platform-reducer";
import { IUiState } from "shared/reducers/ui-reducer";
import { DeepReadonly } from "utility-types";

type RootState = DeepReadonly<{
  notificationSettings: NotificationSettingsState;
  loadingBar: Reducer<any>;
  platformData: PlatformState;
  programsData: ProgramsListState;
  programsRating: ProgramsRatingState;
  fundsData: FundsTableState;
  emailPending: EmailPendingState;
  programNotifications: ProgramNotificationsState;
  fundNotifications: FundNotificationsState;
  authData: AuthState;
  routing: RouterState;
  alertMessages: AlertMessagesState;
  accountSettings: AccountSettingsState;
  wallet: WalletState;
  ui: IUiState;
}>;

export default RootState;
