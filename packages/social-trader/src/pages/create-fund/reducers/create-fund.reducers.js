import apiReducerFactory from "reducers/reducer-creators/api-reducer";
import { combineReducers } from "redux";

import { CREATE_FUND } from "../actions/create-fund.actions";

const createFundReducer = apiReducerFactory({
  apiType: CREATE_FUND
});

const fundSettingsReducer = combineReducers({
  form: createFundReducer
});

export default fundSettingsReducer;
