import { FundsList } from "gv-api-web";
import { combineReducers } from "redux";
import apiReducerFactory, {
  IApiState
} from "shared/reducers/api-reducer/api-reducer";
import { DeepReadonly } from "utility-types";

import { FUNDS_TABLE } from "../actions/funds-table.actions";
import fundsFavoritesReducer from "./funds-table-favorites.reducer";

export type FundsTableState = Readonly<{
  readonly items: IApiState<FundsList>;
}>;

const fundsTableReducer = combineReducers<FundsTableState>({
  items: apiReducerFactory({ apiType: FUNDS_TABLE }, fundsFavoritesReducer)
});

export default fundsTableReducer;
