import { ProgramsList } from "gv-api-web";
import { combineReducers } from "redux";
import apiReducerFactory, {
  IApiReducerFactory
} from "shared/reducers/api-reducer/api-reducer";

import { PROGRAMS } from "../actions/programs-table.actions";
import programsFavoritesReducer from "./programs-favorites.reducer";

export interface IProgramsReducer {
  items: IApiReducerFactory<ProgramsList>;
}

const programsReducer = combineReducers<IProgramsReducer>({
  items: apiReducerFactory({ apiType: PROGRAMS }, programsFavoritesReducer)
});

export default programsReducer;
