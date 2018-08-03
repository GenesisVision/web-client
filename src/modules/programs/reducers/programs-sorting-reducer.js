import sortingReducerFactory from "../../sorting/reducers/sorting-reducers";
import { PROGRAMS } from "../actions/programs-actions.constants";
import { SORTING_FILTER_VALUE } from "../programs.constants";

const programsSortingReducer = sortingReducerFactory({
  type: PROGRAMS,
  sorting: {
    defaultValue: SORTING_FILTER_VALUE
  }
});

export default programsSortingReducer;
