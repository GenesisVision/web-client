import { combineReducers } from "redux";
import apiReducerFactory from "../../../shared/reducers/api-reducer/api-reducer";
import programSearchQueryReducer from "./program-search-query-reducer";

import { PROGRAM_SEARCH } from "../actions/program-search-actions.constants";

const programSearchReducer = combineReducers({
  query: programSearchQueryReducer,
  programs: apiReducerFactory({ apiType: PROGRAM_SEARCH })
});

export default programSearchReducer;
