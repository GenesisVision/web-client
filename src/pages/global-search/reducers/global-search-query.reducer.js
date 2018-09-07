import { GLOBAL_SEARCH_QUERY_VALUE } from "../actions/global-serch.actions";

const initialState = "";

const globalSearchQueryReducer = (state = initialState, action) => {
  switch (action.type) {
    case GLOBAL_SEARCH_QUERY_VALUE:
      return action.payload;
    default:
      return state;
  }
};

export default globalSearchQueryReducer;
