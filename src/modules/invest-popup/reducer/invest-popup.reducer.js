import { combineReducers } from "redux";
import apiReducerFactory from "shared/reducers/api-reducer/api-reducer";
const investPopupReducer = apiReducerFactory({ apiType: "FETCH_INVEST_INFO" });
const investSumbitReducer = apiReducerFactory({ apiType: "INVEST_BY_ID" });

export default combineReducers({
  info: investPopupReducer,
  submit: investSumbitReducer
});
