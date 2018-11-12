import { combineReducers } from "redux";
import apiReducerFactory from "shared/reducers/api-reducer/api-reducer";

import { FUNDS_TABLE } from "../actions/funds-table.actions";
import fundsFavoritesReducer from "./funds-table-favorites.reducer";

const fundsTableReducer = combineReducers({
  items: apiReducerFactory({ apiType: FUNDS_TABLE }, fundsFavoritesReducer)
});

export default fundsTableReducer;
