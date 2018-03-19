import { combineReducers } from "redux";

import apiReducerFactory from "../../../shared/reducers/api-reducer/api-reducer";

import {
  TRADER_DETAIL,
  TRADER_REQUESTS,
  TRADER_HISTORY,
  TRADER_DEALS
} from "../actions/trader-actions.constants";

const traderReducer = combineReducers({
  traderDetail: apiReducerFactory({ apiType: TRADER_DETAIL }),
  requests: apiReducerFactory({ apiType: TRADER_REQUESTS }),
  deals: apiReducerFactory({ apiType: TRADER_DEALS }),
  history: apiReducerFactory({ apiType: TRADER_HISTORY })
});

export default traderReducer;
