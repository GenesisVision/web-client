import { combineReducers } from "redux";

import apiReducerFactory from "../../../shared/reducers/api-reducer/api-reducer";
import pagingReducerFactory from "../../paging/reducers/paging-reducers";
import { PROGRAMS } from "../actions/programs-actions.constants";
import programsDataReducer from "./programs-data-reducer";
import programsFilteringReducer from "./programs-filtering-reducer";
import programsSortingReducer from "./programs-sorting-reducer";

const programsReducer = combineReducers({
  programs: combineReducers({
    items: apiReducerFactory({ apiType: PROGRAMS }, programsDataReducer),
    filtering: programsFilteringReducer,
    sorting: programsSortingReducer,
    paging: pagingReducerFactory({
      type: PROGRAMS,
      paging: { itemsOnPage: 50 }
    })
  })
});

export default programsReducer;
