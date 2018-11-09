import { PROFILE_HEADER } from "modules/header/header.constants";
import { combineReducers } from "redux";

import apiReducerFactory from "../../../shared/reducers/api-reducer/api-reducer";

const headerReducer = combineReducers({
  info: apiReducerFactory({
    apiType: PROFILE_HEADER
  })
});

export default headerReducer;
