import { combineReducers } from "redux";

import apiReducerFactory from "../../../shared/reducers/api-reducer/api-reducer";
import tradersFilterPaneReducer from "./traders-filter-pane";

import { TRADERS } from "../actions/traders-actions.constants";

const tradersReducer = combineReducers({
  traders: apiReducerFactory({ apiType: TRADERS }),
  filtering: combineReducers({
    filterPane: tradersFilterPaneReducer
  })
});

export default tradersReducer;
