import { LOCATION_CHANGE } from "react-router-redux";

import {
  PROGRAM_SEARCH_FOCUSED_STATE,
  PROGRAM_SEARCH_OPEN_STATE
} from "../actions/program-search-actions.constants";

const initialState = {
  isOpen: false,
  isFocused: false
};

const programSearchStateReducer = (state = initialState, action) => {
  switch (action.type) {
    case PROGRAM_SEARCH_OPEN_STATE:
      return {
        ...state,
        isOpen: action.isOpen
      };
    case PROGRAM_SEARCH_FOCUSED_STATE:
      return {
        ...state,
        isFocused: action.isFocused
      };
    case LOCATION_CHANGE: {
      return initialState;
    }
    default:
      return state;
  }
};

export default programSearchStateReducer;
