import { FundNotificationSettingList } from "gv-api-web";
import { NotificationsActionType } from "shared/utils/types";

import {
  ADD_ERROR_MESSAGE,
  ADD_FUND_NOTIFICATIONS,
} from "../actions/fund-notifications.actions";

export type FundNotificationsState = Readonly<{
  data: { [name: string]: FundNotificationSettingList | undefined };
  errorMessage?: string;
}>;

const initialState: FundNotificationsState = {
  data: {}
};

const fundNotificationsReducer = (
  state: FundNotificationsState = initialState,
  action: NotificationsActionType<FundNotificationSettingList>
): FundNotificationsState => {
  switch (action.type) {
    case ADD_FUND_NOTIFICATIONS:
      return {
        data: { ...state.data, [action.settings!.url]: action.settings },
        errorMessage: undefined
      };
    case ADD_ERROR_MESSAGE:
      return { ...state, errorMessage: action.errorMessage };
    default:
      return state;
  }
};

export default fundNotificationsReducer;
