import { ProgramsList } from "gv-api-web";
import { combineReducers } from "redux";
import apiReducerFactory, {
  IApiReducerFactory
} from "shared/reducers/api-reducer/api-reducer";
import { DeepReadonly } from "utility-types";

import { PROGRAMS } from "../actions/programs-table.actions";
import programsFavoritesReducer from "./programs-favorites.reducer";

export type ProgramsListState = DeepReadonly<{
  items: IApiReducerFactory<ProgramsList>;
}>;

const programsReducer = combineReducers<ProgramsListState>({
  items: apiReducerFactory({ apiType: PROGRAMS }, programsFavoritesReducer)
});

export default programsReducer;
