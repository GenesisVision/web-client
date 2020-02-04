import { ItemsViewModelProgramDetailsListItem } from "gv-api-web";
import apiReducerFactory, {
  IApiState
} from "reducers/reducer-creators/api-reducer";
import { combineReducers } from "redux";

import {
  PROGRAMS_RATING,
  SELF_PROGRAMS_RATING
} from "../actions/programs-rating.actions";

const allProgramsRatingReducer = apiReducerFactory<
  ItemsViewModelProgramDetailsListItem
>({
  apiType: PROGRAMS_RATING
});

const selfProgramsRatingReducer = apiReducerFactory<
  ItemsViewModelProgramDetailsListItem
>({
  apiType: SELF_PROGRAMS_RATING
});

export type ProgramsRatingState = Readonly<{
  programs: IApiState<ItemsViewModelProgramDetailsListItem>;
  selfPrograms: IApiState<ItemsViewModelProgramDetailsListItem>;
}>;

const programsRatingReducer = combineReducers<ProgramsRatingState>({
  programs: allProgramsRatingReducer,
  selfPrograms: selfProgramsRatingReducer
});

export default programsRatingReducer;
