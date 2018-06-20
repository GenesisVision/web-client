import { combineReducers } from "redux";

import programSearchQueryReducer from "./program-search-query-reducer";
import programSearchStateReducer from "./program-search-state-reducer";
import programSearchProgramsReducer from "./program-search-programs-reducer";

const programSearchReducer = combineReducers({
  query: programSearchQueryReducer,
  programs: programSearchProgramsReducer,
  state: programSearchStateReducer
});

export default programSearchReducer;
