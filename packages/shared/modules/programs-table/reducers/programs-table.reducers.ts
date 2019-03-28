import { ProgramsList } from "gv-api-web";
import { combineReducers } from "redux";
import apiReducerFactory, {
  IApiState
} from "shared/reducers/api-reducer/api-reducer";

import { PROGRAMS } from "../actions/programs-table.actions";
import programsFavoritesReducer from "./programs-favorites.reducer";

export type ProgramsListState = Readonly<{
  items: IApiState<ProgramsList>;
}>;

const programsReducer = combineReducers<ProgramsListState>({
  items: apiReducerFactory({ apiType: PROGRAMS }, programsFavoritesReducer)
});

export default programsReducer;
