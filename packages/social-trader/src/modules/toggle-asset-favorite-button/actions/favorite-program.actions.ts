import { FavoriteActionProps, FavoriteActionType } from "utils/types";

export const SET_FAVORITE_PROGRAM = "SET_FAVORITE_PROGRAM";

export const addFavoriteProgramAction = ({
  id
}: FavoriteActionProps): FavoriteActionType<any> => ({
  type: SET_FAVORITE_PROGRAM,
  meta: {
    id,
    isFavorite: true
  }
});

export const removeFavoriteProgramAction = ({
  id
}: FavoriteActionProps): FavoriteActionType<any> => ({
  type: SET_FAVORITE_PROGRAM,
  meta: {
    id,
    isFavorite: false
  }
});
