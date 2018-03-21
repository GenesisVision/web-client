import { combineReducers } from "redux";

import apiReducerFactory from "../../../shared/reducers/api-reducer/api-reducer";
import pagingReducerFactory from "../../paging/reducers/paging-reducers";

import {
  TRADER_DETAIL,
  TRADER_REQUESTS,
  TRADER_HISTORY,
  TRADER_DEALS
} from "../actions/trader-actions.constants";

const traderReducer = combineReducers({
  traderDetail: apiReducerFactory({ apiType: TRADER_DETAIL }),
  requests: combineReducers({
    items: apiReducerFactory({ apiType: TRADER_REQUESTS }),
    paging: pagingReducerFactory(TRADER_REQUESTS)
  }),
  deals: combineReducers({
    items: apiReducerFactory({ apiType: TRADER_DEALS }),
    paging: pagingReducerFactory(TRADER_DEALS)
  }),
  history: apiReducerFactory({ apiType: TRADER_HISTORY })
});

export default traderReducer;
