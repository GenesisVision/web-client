import { combineReducers } from "redux";

import { HEADER_INFO } from "../actions/header-info-actions";
import apiReducerFactory from "../shared/reducers/api-reducer/api-reducer";

const headerInfoReducer = combineReducers({
  info: apiReducerFactory({
    apiType: HEADER_INFO
  })
});

export default headerInfoReducer;
