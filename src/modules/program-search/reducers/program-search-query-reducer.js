import { LOCATION_CHANGE } from "react-router-redux";
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
    case LOCATION_CHANGE: {
      return initialState;
    }
    default:
      return state;
  }
};

export default programSearchQueryReducer;
