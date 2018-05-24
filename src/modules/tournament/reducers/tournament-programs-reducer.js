import { SUCCESS_SUFFIX } from "../../../shared/reducers/api-reducer/api-reducer";
import apiReducerFactory from "../../../shared/reducers/api-reducer/api-reducer";

import {
  TOURNAMENT_PROGRAMS,
  TOURNAMENT_FAVOURITE
} from "../actions/tournament-actions.constants";

function tournamentProgramsSubReducer(state, action) {
  switch (action.type) {
    case `${TOURNAMENT_FAVOURITE}_${SUCCESS_SUFFIX}`:
      return {
        ...state,
        data: {
          ...state.data,
          investmentPrograms: state.data.investmentPrograms.map(program => {
            if (program.id === action.payload.id) {
              return {
                ...program,
                isFavorite: !program.isFavorite
              };
            }
            return program;
          })
        }
      };
    default:
      return state;
  }
}

const tournamentProgramsReducer = apiReducerFactory(
  { apiType: TOURNAMENT_PROGRAMS },
  tournamentProgramsSubReducer
);

export default tournamentProgramsReducer;
