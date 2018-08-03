import { SUCCESS_SUFFIX } from "../../../shared/reducers/api-reducer/api-reducer";
import { PROGRAMS_FAVORITE } from "../actions/programs-actions.constants";

const favoritesReducer = (state, action) => {
  switch (action.type) {
    case `${PROGRAMS_FAVORITE}_${SUCCESS_SUFFIX}`:
      return {
        ...state,
        data: {
          ...state.data,
          programs: state.data.pograms.map(program => {
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
};

export default favoritesReducer;
