import { combineReducers } from "redux";

import apiReducerFactory from "../../../shared/reducers/api-reducer/api-reducer";
import tradersFilteringReducer from "./traders-filtering-reducer";
import tradersFilterPaneReducer from "./traders-filter-pane-reducer";

import { TRADERS } from "../actions/traders-actions.constants";

const tradersReducer = combineReducers({
  traders: combineReducers({
    items: apiReducerFactory({ apiType: TRADERS }),
    filtering: tradersFilteringReducer
  }),
  filterPane: combineReducers({
    state: tradersFilterPaneReducer
  })
});

export default tradersReducer;
