import { ItemsViewModelFundDetailsList } from "gv-api-web";
import { SET_FAVORITE_FUND } from "modules/toggle-asset-favorite-button/actions/favorite-fund.actions";
import { updateFavoriteLocal } from "modules/toggle-asset-favorite-button/toggle-asset-favorite-button.service";
import { FavoriteActionType } from "modules/toggle-asset-favorite-button/toggle-asset-favorite-button.types";
import { IApiState } from "reducers/reducer-creators/api-reducer";

const favoritesReducer = (
  state: IApiState<ItemsViewModelFundDetailsList>,
  action: FavoriteActionType
): IApiState<ItemsViewModelFundDetailsList> => {
  switch (action.type) {
    case SET_FAVORITE_FUND:
      return updateFavoriteLocal(
        state,
        action.meta.id,
        action.meta.isFavorite
      ) as IApiState<ItemsViewModelFundDetailsList>;
    default:
      return state;
  }
};

export default favoritesReducer;
