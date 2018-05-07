import filteringReducerFactory from "../../filtering/reducers/filtering-reducers";
import { TOURNAMENT_PROGRAMS } from "../actions/tournament-actions.constants";

const TOURNAMENT_PROGRAMS_FILTERS = { round: 0 };

const tournamentProgramsFilteringReducer = filteringReducerFactory({
  type: TOURNAMENT_PROGRAMS,
  filters: TOURNAMENT_PROGRAMS_FILTERS
});

export default tournamentProgramsFilteringReducer;
