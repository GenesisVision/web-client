import {
  ADD_ERROR_MESSAGE,
  ADD_PROGRAM_NOTIFICATIONS
} from "../actions/program-notifications.actions";

const initialState = {};

const programNotificationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PROGRAM_NOTIFICATIONS:
      return {
        ...state,
        [action.settings.url]: action.settings,
        errorMessage: undefined
      };
    case ADD_ERROR_MESSAGE:
      return { ...state, errorMessage: action.errorMessage };
    default:
      return state;
  }
};

export default programNotificationsReducer;
