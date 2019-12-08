import { ItemsViewModelProgramDetailsList } from "gv-api-web";
import { SET_FAVORITE_FOLLOW } from "modules/toggle-asset-favorite-button/actions/favorite-follow.actions";
import { FavoriteActionType } from "modules/toggle-asset-favorite-button/toggle-asset-favorite-button.types";
import { IApiState } from "reducers/reducer-creators/api-reducer";

const updateFavoriteLocal = (
  state: IApiState<ItemsViewModelProgramDetailsList>,
  id: string,
  isFavorite: boolean
): IApiState<ItemsViewModelProgramDetailsList> => {
  if (!state.data) return state;
  return {
    ...state,
    data: {
      ...state.data,
      items: state.data.items.map(program =>
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
  state: IApiState<ItemsViewModelProgramDetailsList>,
  action: FavoriteActionType
): IApiState<ItemsViewModelProgramDetailsList> => {
  switch (action.type) {
    case SET_FAVORITE_FOLLOW:
      return updateFavoriteLocal(state, action.meta.id, action.meta.isFavorite);
    default:
      return state;
  }
};

export default favoritesReducer;
