import apiReducerFactory from "../../../shared/reducers/api-reducer/api-reducer";

import { PROGRAM_CLOSE_PERIOD } from "../actions/program-close-period-actions.constants";

const programClosePeriodReducer = apiReducerFactory({
  apiType: PROGRAM_CLOSE_PERIOD
});
export default programClosePeriodReducer;
