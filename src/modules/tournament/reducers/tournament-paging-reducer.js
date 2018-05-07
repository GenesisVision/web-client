import pagingReducerFactory from "../../paging/reducers/paging-reducers";

import { TOURNAMENT_PROGRAMS } from "../actions/tournament-actions.constants";

const tournamentProgramsPagingReducer = pagingReducerFactory({
  type: TOURNAMENT_PROGRAMS,
  paging: { itemsOnPage: 10 }
});

export default tournamentProgramsPagingReducer;
