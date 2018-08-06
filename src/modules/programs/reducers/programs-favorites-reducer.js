import { SET_FAVORITE_PROGRAM } from "modules/favorite-program/actions/favorite-program-actions";
import { REQUEST_SUFFIX } from "shared/reducers/api-reducer/api-reducer";

const favoritesReducer = (state, action) => {
  switch (action.type) {
    case `${SET_FAVORITE_PROGRAM}_${REQUEST_SUFFIX}`:
      return {
        ...state,
        data: {
          ...state.data,
          programs: state.data.pograms.map(program => {
            if (program.id === action.meta.programId) {
              return {
                ...program,
                isFavorite: action.meta.isFavorite
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
