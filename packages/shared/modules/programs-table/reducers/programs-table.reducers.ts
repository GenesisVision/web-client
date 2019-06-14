import { ProgramsList } from "gv-api-web";
import { combineReducers } from "redux";
import apiReducerFactory, {
  IApiState
} from "shared/reducers/reducer-creators/api-reducer";
import { apiSelector } from "shared/utils/selectors";

import { PROGRAMS } from "../actions/programs-table.actions";
import programsFavoritesReducer from "./programs-favorites.reducer";

export type ProgramsListState = Readonly<{
  items: IApiState<ProgramsList>;
}>;

export const programsDataSelector = apiSelector<ProgramsList>(
  state => state.programsData.items
);

const programsReducer = combineReducers<ProgramsListState>({
  items: apiReducerFactory({ apiType: PROGRAMS }, programsFavoritesReducer)
});

export default programsReducer;
