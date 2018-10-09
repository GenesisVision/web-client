import { ADD_PROGRAM_NOTIFICATIONS } from "modules/program-notifications/actions/program-notifications.actions";

const initialState = {};

const programNotificationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PROGRAM_NOTIFICATIONS:
      return { ...state, [action.settings.url]: action.settings };
    default:
      return state;
  }
};

export default programNotificationsReducer;
