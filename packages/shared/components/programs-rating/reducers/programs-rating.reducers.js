import { combineReducers } from "redux";
import apiReducerFactory from "shared/reducers/api-reducer/api-reducer";

import {
  PROGRAMS_RATING,
  SELF_PROGRAMS_RATING
} from "../actions/programs-rating.actions";

const allProgramsRatingReducer = apiReducerFactory({
  apiType: PROGRAMS_RATING
});
const selfProgramsRatingReducer = apiReducerFactory({
  apiType: SELF_PROGRAMS_RATING
});

const programsRatingReducer = combineReducers({
  programs: allProgramsRatingReducer,
  selfPrograms: selfProgramsRatingReducer
});

export default programsRatingReducer;
