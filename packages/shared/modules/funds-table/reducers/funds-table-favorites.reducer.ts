import { ItemsViewModelFundDetailsList } from "gv-api-web";
import { SET_FAVORITE_FUND } from "shared/modules/favorite-asset/actions/favorite-fund.actions";
import {
  FAILURE_SUFFIX,
  IApiState,
  REQUEST_SUFFIX
} from "shared/reducers/reducer-creators/api-reducer";
import { FavoriteActionType } from "shared/utils/types";

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
    case `${SET_FAVORITE_FUND}_${REQUEST_SUFFIX}`:
      return updateFavoriteLocal(state, action.meta.id, action.meta.isFavorite);
    case `${SET_FAVORITE_FUND}_${FAILURE_SUFFIX}`: {
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
