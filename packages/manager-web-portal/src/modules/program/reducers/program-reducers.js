import { combineReducers } from "redux";

import apiReducerFactory from "../../../shared/reducers/api-reducer/api-reducer";
import pagingReducerFactory from "../../paging/reducers/paging-reducers";

import {
  PROGRAM_DETAIL,
  PROGRAM_REQUESTS,
  PROGRAM_HISTORY,
  PROGRAM_DEALS
} from "../actions/program-actions.constants";

const programReducer = combineReducers({
  programDetail: apiReducerFactory({ apiType: PROGRAM_DETAIL }),
  requests: combineReducers({
    items: apiReducerFactory({ apiType: PROGRAM_REQUESTS }),
    paging: pagingReducerFactory({ type: PROGRAM_REQUESTS })
  }),
  deals: combineReducers({
    items: apiReducerFactory({ apiType: PROGRAM_DEALS }),
    paging: pagingReducerFactory({ type: PROGRAM_DEALS })
  }),
  history: apiReducerFactory({ apiType: PROGRAM_HISTORY })
});

export default programReducer;
