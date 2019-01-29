import { LevelUpSummary, ProgramsList } from "gv-api-web";
import { combineReducers } from "redux";
import apiReducerFactory, {
  IApiReducerFactory
} from "shared/reducers/api-reducer/api-reducer";

import {
  LEVELUP_SUMMARY,
  PROGRAMS_RATING,
  SELF_PROGRAMS_RATING
} from "../actions/programs-rating.actions";

const allProgramsRatingReducer = apiReducerFactory({
  apiType: PROGRAMS_RATING
});
const selfProgramsRatingReducer = apiReducerFactory({
  apiType: SELF_PROGRAMS_RATING
});
const levelupSummaryReducer = apiReducerFactory({
  apiType: LEVELUP_SUMMARY
});

export interface IProgramsRatingReducer {
  programs: IApiReducerFactory<ProgramsList>;
  selfPrograms: IApiReducerFactory<ProgramsList>;
  levelupSummary: IApiReducerFactory<LevelUpSummary>;
}

const programsRatingReducer = combineReducers<IProgramsRatingReducer>({
  programs: allProgramsRatingReducer,
  selfPrograms: selfProgramsRatingReducer,
  levelupSummary: levelupSummaryReducer
});

export default programsRatingReducer;
