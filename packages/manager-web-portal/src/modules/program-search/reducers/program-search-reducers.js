import { combineReducers } from "redux";

import programSearchProgramsReducer from "./program-search-programs-reducer";
import programSearchQueryReducer from "./program-search-query-reducer";
import programSearchStateReducer from "./program-search-state-reducer";

const programSearchReducer = combineReducers({
  query: programSearchQueryReducer,
  programs: programSearchProgramsReducer,
  state: programSearchStateReducer
});

export default programSearchReducer;
