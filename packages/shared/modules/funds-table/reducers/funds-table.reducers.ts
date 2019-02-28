import { FundsList } from "gv-api-web";
import { combineReducers } from "redux";
import apiReducerFactory, {
  IApiReducerFactory
} from "shared/reducers/api-reducer/api-reducer";
import { DeepReadonly } from "utility-types";

import { FUNDS_TABLE } from "../actions/funds-table.actions";
import fundsFavoritesReducer from "./funds-table-favorites.reducer";

export type FundsTableState = DeepReadonly<{
  readonly items: IApiReducerFactory<FundsList>;
}>;

const fundsTableReducer = combineReducers<FundsTableState>({
  items: apiReducerFactory({ apiType: FUNDS_TABLE }, fundsFavoritesReducer)
});

export default fundsTableReducer;
