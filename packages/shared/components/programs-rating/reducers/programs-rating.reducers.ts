import { LevelUpSummary, ProgramsListOld } from "gv-api-web";
import { combineReducers } from "redux";
import apiReducerFactory, {
  IApiState
} from "shared/reducers/reducer-creators/api-reducer";
import {
  apiFieldSelector,
  apiSelector,
  fieldSelector
} from "shared/utils/selectors";

import {
  LEVELUP_SUMMARY,
  PROGRAMS_RATING,
  SELF_PROGRAMS_RATING
} from "../actions/programs-rating.actions";

export const allProgramsSelector = apiSelector<ProgramsListOld>(
  state => state.programsRating.programs
);

const allProgramsRatingReducer = apiReducerFactory<ProgramsListOld>({
  apiType: PROGRAMS_RATING
});

export const selfProgramsSelector = apiSelector<ProgramsListOld>(
  state => state.programsRating.selfPrograms
);

const selfProgramsRatingReducer = apiReducerFactory<ProgramsListOld>({
  apiType: SELF_PROGRAMS_RATING
});

export const levelupSummarySelector = apiSelector<LevelUpSummary>(
  state => state.programsRating.levelupSummary
);

export const levelDataSelector = apiFieldSelector(
  levelupSummarySelector,
  fieldSelector(state => state.levelData),
  []
);

const levelupSummaryReducer = apiReducerFactory<LevelUpSummary>({
  apiType: LEVELUP_SUMMARY
});

export type ProgramsRatingState = Readonly<{
  programs: IApiState<ProgramsListOld>;
  selfPrograms: IApiState<ProgramsListOld>;
  levelupSummary: IApiState<LevelUpSummary>;
}>;

const programsRatingReducer = combineReducers<ProgramsRatingState>({
  programs: allProgramsRatingReducer,
  selfPrograms: selfProgramsRatingReducer,
  levelupSummary: levelupSummaryReducer
});

export default programsRatingReducer;
