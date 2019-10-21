import fundsApi from "shared/services/api-client/funds-api";
import { FavoriteActionProps, FavoriteActionType } from "shared/utils/types";

export const SET_FAVORITE_FUND = "SET_FAVORITE_FUND";

export const addFavoriteFundAction = ({
  id,
  authorization
}: FavoriteActionProps): FavoriteActionType<any> => ({
  type: SET_FAVORITE_FUND,
  payload: fundsApi.addToFavorites(id, authorization),
  meta: {
    id,
    isFavorite: true
  }
});

export const removeFavoriteFundAction = ({
  id,
  authorization
}: FavoriteActionProps): FavoriteActionType<any> => ({
  type: SET_FAVORITE_FUND,
  payload: fundsApi.removeFromFavorites(id, authorization),
  meta: {
    id,
    isFavorite: false
  }
});
