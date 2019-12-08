import { ItemsViewModelFundDetailsList } from "gv-api-web";
import { SET_FAVORITE_FUND } from "modules/toggle-asset-favorite-button/actions/favorite-fund.actions";
import { IApiState } from "reducers/reducer-creators/api-reducer";
import { FavoriteActionType } from "utils/types";

const updateFavoriteLocal = (
  state: IApiState<ItemsViewModelFundDetailsList>,
  id: string,
  isFavorite: boolean
): IApiState<ItemsViewModelFundDetailsList> => {
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
  state: IApiState<ItemsViewModelFundDetailsList>,
  action: FavoriteActionType
): IApiState<ItemsViewModelFundDetailsList> => {
  switch (action.type) {
    case SET_FAVORITE_FUND:
      return updateFavoriteLocal(state, action.meta.id, action.meta.isFavorite);
    default:
      return state;
  }
};

export default favoritesReducer;
