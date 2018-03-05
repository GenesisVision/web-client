import { combineReducers } from "redux";

import apiReducerFactory from "../../../shared/reducers/api-reducer/api-reducer";

import { TRADER, TRADER_REQUESTS } from "../actions/traders-actions.constants";

const traderReducer = combineReducers({
  traders: apiReducerFactory({ apiType: TRADER }),
  requests: apiReducerFactory({ apiType: TRADER_REQUESTS })
});

export default traderReducer;
