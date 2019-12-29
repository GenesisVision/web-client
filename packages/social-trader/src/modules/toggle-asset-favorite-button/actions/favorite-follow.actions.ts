import {
  FavoriteActionProps,
  FavoriteActionType
} from "../toggle-asset-favorite-button.types";

export const SET_FAVORITE_FOLLOW = "SET_FAVORITE_FOLLOW";

export const addFavoriteFollowAction = ({
  id
}: FavoriteActionProps): FavoriteActionType<any> => ({
  type: SET_FAVORITE_FOLLOW,
  meta: {
    id,
    isFavorite: true
  }
});

export const removeFavoriteFollowAction = ({
  id
}: FavoriteActionProps): FavoriteActionType<any> => ({
  type: SET_FAVORITE_FOLLOW,
  meta: {
    id,
    isFavorite: false
  }
});
