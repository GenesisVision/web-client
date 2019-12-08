import { FavoriteActionProps, FavoriteActionType } from "utils/types";

export const SET_FAVORITE_FUND = "SET_FAVORITE_FUND";

export const addFavoriteFundAction = ({
  id
}: FavoriteActionProps): FavoriteActionType<any> => ({
  type: SET_FAVORITE_FUND,
  meta: {
    id,
    isFavorite: true
  }
});

export const removeFavoriteFundAction = ({
  id
}: FavoriteActionProps): FavoriteActionType<any> => ({
  type: SET_FAVORITE_FUND,
  meta: {
    id,
    isFavorite: false
  }
});
