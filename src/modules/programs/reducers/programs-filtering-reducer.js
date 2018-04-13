import { PROGRAMS_FILTERS } from "../programs.constants";
import filteringReducerFactory from "../../filtering/reducers/filtering-reducers";

import { PROGRAMS } from "../actions/programs-actions.constants";

const programsFilteringReducer = filteringReducerFactory({
  type: PROGRAMS,
  filters: PROGRAMS_FILTERS
});

export default programsFilteringReducer;
