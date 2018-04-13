import { combineReducers } from "redux";

import apiReducerFactory from "../../../shared/reducers/api-reducer/api-reducer";
import programsFilteringReducer from "./programs-filtering-reducer";
import programsFilterPaneReducer from "./programs-filter-pane-reducer";

import { PROGRAMS } from "../actions/programs-actions.constants";

const programsReducer = combineReducers({
  programs: combineReducers({
    items: apiReducerFactory({ apiType: PROGRAMS }),
    filtering: programsFilteringReducer
  }),
  filterPane: combineReducers({
    state: programsFilterPaneReducer
  })
});

export default programsReducer;
