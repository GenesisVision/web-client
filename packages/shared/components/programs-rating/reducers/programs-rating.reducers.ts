import { LevelUpSummary, ProgramsList } from "gv-api-web";
import { combineReducers } from "redux";
import apiReducerFactory, {
  IApiReducerFactory
} from "shared/reducers/api-reducer/api-reducer";
import { DeepReadonly } from "utility-types";

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

export type ProgramsRatingState = DeepReadonly<{
  readonly programs: IApiReducerFactory<ProgramsList>;
  readonly selfPrograms: IApiReducerFactory<ProgramsList>;
  readonly levelupSummary: IApiReducerFactory<LevelUpSummary>;
}>;

const programsRatingReducer = combineReducers<ProgramsRatingState>({
  programs: allProgramsRatingReducer,
  selfPrograms: selfProgramsRatingReducer,
  levelupSummary: levelupSummaryReducer
});

export default programsRatingReducer;
