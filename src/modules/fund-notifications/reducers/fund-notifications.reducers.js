import { ADD_FUND_NOTIFICATIONS } from "modules/fund-notifications/actions/fund-notifications.actions";

const initialState = {};

const fundNotificationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_FUND_NOTIFICATIONS:
      return { ...state, [action.settings.url]: action.settings };
    default:
      return state;
  }
};

export default fundNotificationsReducer;
