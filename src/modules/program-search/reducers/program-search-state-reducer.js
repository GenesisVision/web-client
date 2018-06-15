import { PROGRAM_SEARCH_STATE } from "../actions/program-search-actions.constants";

const initialState = {
  isOpen: false
};

const programSearchStateReducer = (state = initialState, action) => {
  switch (action.type) {
    case PROGRAM_SEARCH_STATE:
      return {
        ...state,
        isOpen: action.isOpen
      };
    default:
      return state;
  }
};

export default programSearchStateReducer;
