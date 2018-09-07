import { DEFAULT_PAGING } from "modules/table/reducers/table-paging.reducer";
import tableReducerFactory from "modules/table/reducers/table.reducer";
import clearableReducer from "reducers/clearable.reducer";
import { combineReducers } from "redux";

import { GLOBAL_SEARCH_PROGRAMS } from "../actions/global-serch.actions";
import globalSearchQueryReducer from "./global-search-query.reducer";

const globalSearchReducer = combineReducers({
  queryValue: clearableReducer(globalSearchQueryReducer),
  result: tableReducerFactory({
    type: GLOBAL_SEARCH_PROGRAMS,
    paging: DEFAULT_PAGING
  })
});

export default globalSearchReducer;
