import programApi from "shared/services/api-client/programs-api";
import { FavoriteActionProps, FavoriteActionType } from "shared/utils/types";

export const SET_FAVORITE_PROGRAM = "SET_FAVORITE_PROGRAM";

export const addFavoriteProgramAction = ({
  id,
  authorization
}: FavoriteActionProps): FavoriteActionType<any> => ({
  type: SET_FAVORITE_PROGRAM,
  payload: programApi.addToFavorites(id, authorization),
  meta: {
    id,
    isFavorite: true
  }
});

export const removeFavoriteProgramAction = ({
  id,
  authorization
}: FavoriteActionProps): FavoriteActionType<any> => ({
  type: SET_FAVORITE_PROGRAM,
  payload: programApi.removeFromFavorites(id, authorization),
  meta: {
    id,
    isFavorite: false
  }
});
