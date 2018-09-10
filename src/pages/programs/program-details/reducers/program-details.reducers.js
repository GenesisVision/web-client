import { combineReducers } from "redux";
import apiReducerFactory from "shared/reducers/api-reducer/api-reducer";

import {
  PROGRAM_CHART,
  PROGRAM_DETAILS
} from "../actions/program-details.actions";
import programDetailsReinvestingReducer from "./program-details-reinvesting.reducer";

const programDetailsReducer = combineReducers({
  programDetailsDescription: apiReducerFactory(
    {
      apiType: PROGRAM_DETAILS
    },
    programDetailsReinvestingReducer
  ),
  chart: apiReducerFactory({
    apiType: PROGRAM_CHART
  })
});
export default programDetailsReducer;
