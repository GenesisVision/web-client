import { combineReducers } from "redux";

import apiReducerFactory from "../../../shared/reducers/api-reducer/api-reducer";
import pagingReducerFactory from "../../paging/reducers/paging-reducers";
import { PROGRAMS } from "../actions/programs-actions.constants";
import programsFilterPaneReducer from "./programs-filter-pane-reducer";
import programsFilteringReducer from "./programs-filtering-reducer";
import programsSortingReducer from "./programs-sorting-reducer";

const programsReducer = combineReducers({
  programs: combineReducers({
    items: apiReducerFactory({ apiType: PROGRAMS }),
    filtering: programsFilteringReducer,
    paging: pagingReducerFactory({
      type: PROGRAMS,
      paging: { itemsOnPage: 100 }
    }),
    sorting: programsSortingReducer
  }),
  filterPane: combineReducers({
    state: programsFilterPaneReducer
  })
});

export default programsReducer;
