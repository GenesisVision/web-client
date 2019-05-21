import { ProgramsList } from "gv-api-web";
import { SET_FAVORITE_PROGRAM } from "shared/modules/favorite-asset/actions/favorite-program.actions";
import {
  FAILURE_SUFFIX,
  IApiState,
  REQUEST_SUFFIX
} from "shared/reducers/api-reducer/api-reducer";
import { FavoriteActionType } from "shared/utils/types";

const updateFavoriteLocal = (
  state: IApiState<ProgramsList>,
  id: string,
  isFavorite: boolean
): IApiState<ProgramsList> => {
  return {
    ...state,
    data: {
      ...state.data,
      total: (state.data && state.data.total) || 0,
      programs:
        (state.data &&
          state.data.programs.map(program => {
            if (program.id === id) {
              return {
                ...program,
                personalDetails: {
                  ...program.personalDetails,
                  isFavorite: isFavorite
                }
              };
            }
            return program;
          })) ||
        []
    }
  };
};

const favoritesReducer = (
  state: IApiState<ProgramsList>,
  action: FavoriteActionType
): IApiState<ProgramsList> => {
  switch (action.type) {
    case `${SET_FAVORITE_PROGRAM}_${REQUEST_SUFFIX}`:
      return updateFavoriteLocal(
        state,
        action.meta.id,
        action.meta.isFavorite
      );
    case `${SET_FAVORITE_PROGRAM}_${FAILURE_SUFFIX}`: {
      return updateFavoriteLocal(
        state,
        action.meta.id,
        !action.meta.isFavorite
      );
    }
    default:
      return state;
  }
};

export default favoritesReducer;
