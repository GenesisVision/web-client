import { FundsListOld } from "gv-api-web";
import { combineReducers } from "redux";
import apiReducerFactory, {
  IApiState
} from "shared/reducers/reducer-creators/api-reducer";
import { apiSelector } from "shared/utils/selectors";

import { FUNDS_TABLE } from "../actions/funds-table.actions";
import fundsFavoritesReducer from "./funds-table-favorites.reducer";

export type FundsTableState = Readonly<{
  readonly items: IApiState<FundsListOld>;
}>;

export const fundsDataSelector = apiSelector<FundsListOld>(
  state => state.fundsData.items
);

const fundsTableReducer = combineReducers<FundsTableState>({
  items: apiReducerFactory({ apiType: FUNDS_TABLE }, fundsFavoritesReducer)
});

export default fundsTableReducer;
