import { ProgramDetailsListItemItemsViewModel } from "gv-api-web";
import apiReducerFactory, {
  IApiState
} from "reducers/reducer-creators/api-reducer";
import { combineReducers } from "redux";
import { apiSelector } from "utils/selectors";

import { PROGRAMS } from "../actions/programs-table.actions";
import programsFavoritesReducer from "./programs-favorites.reducer";

export type ProgramsListState = Readonly<{
  items: IApiState<ProgramDetailsListItemItemsViewModel>;
}>;

export const programsDataSelector = apiSelector<
  ProgramDetailsListItemItemsViewModel
>(state => {
  return state.programsData.items;
});

const programsReducer = combineReducers<ProgramsListState>({
  items: apiReducerFactory({ apiType: PROGRAMS }, programsFavoritesReducer)
});

export default programsReducer;
