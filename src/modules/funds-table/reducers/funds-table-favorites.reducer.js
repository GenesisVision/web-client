import { SET_FAVORITE_FUND } from "modules/favorite-asset/actions/favorite-fund.actions";
import {
  FAILURE_SUFFIX,
  REQUEST_SUFFIX
} from "shared/reducers/api-reducer/api-reducer";

const updateFavoriteLocal = (state, programId, isFavorite) => {
  return {
    ...state,
    data: {
      ...state.data,
      programs: state.data.programs.map(program => {
        if (program.id === programId) {
          return {
            ...program,
            personalProgramDetails: {
              ...program.personalProgramDetails,
              isFavorite: isFavorite
            }
          };
        }
        return program;
      })
    }
  };
};

const favoritesReducer = (state, action) => {
  switch (action.type) {
    case `${SET_FAVORITE_FUND}_${REQUEST_SUFFIX}`:
      return updateFavoriteLocal(
        state,
        action.meta.programId,
        action.meta.isFavorite
      );
    case `${SET_FAVORITE_FUND}_${FAILURE_SUFFIX}`: {
      return updateFavoriteLocal(
        state,
        action.meta.programId,
        !action.meta.isFavorite
      );
    }
    default:
      return state;
  }
};

export default favoritesReducer;
