import { combineReducers } from "redux";

import tournamentProgramsFilteringReducer from "./tournament-filtering-reducer";
import tournamentProgramsPagingReducer from "./tournament-paging-reducer";
import tournamentProgramsReducer from "./tournament-programs-reducer";

const tournamentReducer = combineReducers({
  programs: combineReducers({
    items: tournamentProgramsReducer,
    filtering: tournamentProgramsFilteringReducer,
    paging: tournamentProgramsPagingReducer
  })
});

export default tournamentReducer;
