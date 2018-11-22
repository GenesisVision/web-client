import { combineReducers } from "redux";
import { PROFILE_HEADER } from "shared/components/header/header.constants";
import apiReducerFactory from "shared/reducers/api-reducer/api-reducer";

const headerReducer = combineReducers({
  info: apiReducerFactory({
    apiType: PROFILE_HEADER
  })
});

export default headerReducer;
