import { combineReducers } from "redux";

import apiReducerFactory from "../../../shared/reducers/api-reducer/api-reducer";

import { PROFILE, PROFILE_FORM } from "../actions/profile-actions.constants";

const profileReducer = combineReducers({
  view: apiReducerFactory({ apiType: PROFILE }),
  form: apiReducerFactory({ apiType: PROFILE_FORM })
});

export default profileReducer;
