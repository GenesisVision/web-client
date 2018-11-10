import { combineReducers } from "redux";

import { PLATFORM_SETTINGS } from "../actions/platform-action";
import apiReducerFactory from "shared/reducers/api-reducer/api-reducer";

const platformReducer = combineReducers({
  settings: apiReducerFactory({
    apiType: PLATFORM_SETTINGS
  })
});

export default platformReducer;
