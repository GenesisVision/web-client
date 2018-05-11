import filteringReducerFactory from "../../filtering/reducers/filtering-reducers";
import { TOURNAMENT_PROGRAMS } from "../actions/tournament-actions.constants";
import { ROUND_NUMBER_FILTER_NAME } from "../tournament.constants";

const TOURNAMENT_PROGRAMS_FILTERS = [
  { name: ROUND_NUMBER_FILTER_NAME, value: 0 }
];

const tournamentProgramsFilteringReducer = filteringReducerFactory({
  type: TOURNAMENT_PROGRAMS,
  filters: {
    defaultFilters: TOURNAMENT_PROGRAMS_FILTERS
  }
});

export default tournamentProgramsFilteringReducer;
