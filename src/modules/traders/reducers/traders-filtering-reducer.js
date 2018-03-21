import { TRADERS_FILTERS } from "../helpers/traders-constants";
import filteringReducerFactory from "../../filtering/reducers/filtering-reducers";

import { TRADERS } from "../actions/traders-actions.constants";

const tradersFilteringReducer = filteringReducerFactory({
  type: TRADERS,
  filters: TRADERS_FILTERS
});

export default tradersFilteringReducer;
