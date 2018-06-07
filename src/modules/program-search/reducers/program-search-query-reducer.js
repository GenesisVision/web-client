import { PROGRAM_SEARCH_QUERY_UPDATE } from "../actions/program-search-actions.constants";

const initialState = {
  query: ""
};

const programSearchQueryReducer = (state = initialState, action) => {
  switch (action.type) {
    case PROGRAM_SEARCH_QUERY_UPDATE:
      return {
        ...state,
        query: action.payload
      };
    default:
      return state;
  }
};

export default programSearchQueryReducer;
