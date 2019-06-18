import { ProgramsList } from "gv-api-web";
import { SET_FAVORITE_PROGRAM } from "shared/modules/favorite-asset/actions/favorite-program.actions";
import {
  FAILURE_SUFFIX,
  IApiState,
  REQUEST_SUFFIX
} from "shared/reducers/reducer-creators/api-reducer";
import { FavoriteActionType } from "shared/utils/types";

const updateFavoriteLocal = (
  state: IApiState<ProgramsList>,
  id: string,
  isFavorite: boolean
): IApiState<ProgramsList> => {
  if (!state.data) return state;
  return {
    ...state,
    data: {
      ...state.data,
      programs: state.data.programs.map(program =>
        program.id === id
          ? {
              ...program,
              personalDetails: {
                ...program.personalDetails,
                isFavorite
              }
            }
          : program
      )
    }
  };
};

const favoritesReducer = (
  state: IApiState<ProgramsList>,
  action: FavoriteActionType
): IApiState<ProgramsList> => {
  switch (action.type) {
    case `${SET_FAVORITE_PROGRAM}_${REQUEST_SUFFIX}`:
      return updateFavoriteLocal(state, action.meta.id, action.meta.isFavorite);
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
