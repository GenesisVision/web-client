import { PROFILE_HEADER } from "modules/profile-header/profile-header.constants";
import { combineReducers } from "redux";

import apiReducerFactory from "../../../shared/reducers/api-reducer/api-reducer";

const profileHeaderReducer = combineReducers({
  info: apiReducerFactory({
    apiType: PROFILE_HEADER
  })
});

export default profileHeaderReducer;
