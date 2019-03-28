import { FundNotificationSettingList } from "gv-api-web";

import {
  ADD_ERROR_MESSAGE,
  ADD_FUND_NOTIFICATIONS
} from "../actions/fund-notifications.actions";

export type FundNotificationsState = Readonly<{
  data: { [name: string]: FundNotificationSettingList };
  errorMessage?: string;
}>;

const initialState = {
  data: {}
};

const fundNotificationsReducer = (
  state: FundNotificationsState = initialState,
  action: any
): FundNotificationsState => {
  switch (action.type) {
    case ADD_FUND_NOTIFICATIONS:
      return {
        data: { ...state.data, [action.settings.url]: action.settings },
        errorMessage: undefined
      };
    case ADD_ERROR_MESSAGE:
      return { ...state, errorMessage: action.errorMessage };
    default:
      return state;
  }
};

export default fundNotificationsReducer;
