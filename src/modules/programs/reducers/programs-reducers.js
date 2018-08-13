import { combineReducers } from "redux";
import apiReducerFactory from "shared/reducers/api-reducer/api-reducer";

import { PROGRAMS } from "../actions/programs-actions";
import programsFavoritesReducer from "./programs-favorites-reducer";

const programsReducer = combineReducers({
  items: apiReducerFactory({ apiType: PROGRAMS }, programsFavoritesReducer)
});

export default programsReducer;
