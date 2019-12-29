import { ItemsViewModelProgramDetailsListItem } from "gv-api-web";
import apiReducerFactory, {
  IApiState
} from "reducers/reducer-creators/api-reducer";
import { combineReducers } from "redux";
import { apiFieldSelector, apiSelector, fieldSelector } from "utils/selectors";

import {
  LEVELUP_SUMMARY,
  PROGRAMS_RATING,
  SELF_PROGRAMS_RATING
} from "../actions/programs-rating.actions";

export const allProgramsSelector = apiSelector<
  ItemsViewModelProgramDetailsListItem
>(state => state.programsRating.programs);

const allProgramsRatingReducer = apiReducerFactory<
  ItemsViewModelProgramDetailsListItem
>({
  apiType: PROGRAMS_RATING
});

export const selfProgramsSelector = apiSelector<
  ItemsViewModelProgramDetailsListItem
>(state => state.programsRating.selfPrograms);

const selfProgramsRatingReducer = apiReducerFactory<
  ItemsViewModelProgramDetailsListItem
>({
  apiType: SELF_PROGRAMS_RATING
});

// export const levelupSummarySelector = apiSelector<LevelUpSummary>(
//   state => state.programsRating.levelupSummary
// );

// export const levelDataSelector = apiFieldSelector(
//   levelupSummarySelector,
//   fieldSelector(state => state.levelData),
//   []
// );
//
// const levelupSummaryReducer = apiReducerFactory<LevelUpSummary>({
//   apiType: LEVELUP_SUMMARY
// });

export type ProgramsRatingState = Readonly<{
  programs: IApiState<ItemsViewModelProgramDetailsListItem>;
  selfPrograms: IApiState<ItemsViewModelProgramDetailsListItem>;
  // levelupSummary: IApiState<LevelUpSummary>;
}>;

const programsRatingReducer = combineReducers<ProgramsRatingState>({
  programs: allProgramsRatingReducer,
  selfPrograms: selfProgramsRatingReducer
  // levelupSummary: levelupSummaryReducer
});

export default programsRatingReducer;
