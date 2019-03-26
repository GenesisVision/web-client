import { LevelUpSummary, ProgramsList } from "gv-api-web";
import { combineReducers } from "redux";
import apiReducerFactory, {
  IApiState
} from "shared/reducers/api-reducer/api-reducer";

import {
  LEVELUP_SUMMARY,
  PROGRAMS_RATING,
  SELF_PROGRAMS_RATING
} from "../actions/programs-rating.actions";

const allProgramsRatingReducer = apiReducerFactory<ProgramsList>({
  apiType: PROGRAMS_RATING
});
const selfProgramsRatingReducer = apiReducerFactory<ProgramsList>({
  apiType: SELF_PROGRAMS_RATING
});
const levelupSummaryReducer = apiReducerFactory<LevelUpSummary>({
  apiType: LEVELUP_SUMMARY
});

export type ProgramsRatingState = Readonly<{
  programs: IApiState<ProgramsList>;
  selfPrograms: IApiState<ProgramsList>;
  levelupSummary: IApiState<LevelUpSummary>;
}>;

const programsRatingReducer = combineReducers<ProgramsRatingState>({
  programs: allProgramsRatingReducer,
  selfPrograms: selfProgramsRatingReducer,
  levelupSummary: levelupSummaryReducer
});

export default programsRatingReducer;
