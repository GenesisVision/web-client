import {
  FavoriteActionProps,
  FavoriteActionType
} from "../toggle-asset-favorite-button.types";

export const SET_FAVORITE_PROGRAM = "SET_FAVORITE_PROGRAM";

export const addFavoriteProgramAction = ({
  id
}: FavoriteActionProps): FavoriteActionType => ({
  type: SET_FAVORITE_PROGRAM,
  meta: {
    id,
    isFavorite: true
  }
});

export const removeFavoriteProgramAction = ({
  id
}: FavoriteActionProps): FavoriteActionType => ({
  type: SET_FAVORITE_PROGRAM,
  meta: {
    id,
    isFavorite: false
  }
});
