import { CancelablePromise } from "gv-api-web";
import programApi from "shared/services/api-client/programs-api";
import { FavoriteActionProps, FavoriteActionType } from "shared/utils/types";

export const SET_FAVORITE_PROGRAM = "SET_FAVORITE_PROGRAM";

export const addFavoriteProgram = ({
  id,
  authorization
}: FavoriteActionProps): FavoriteActionType<CancelablePromise<any>> => ({
  type: SET_FAVORITE_PROGRAM,
  payload: programApi.v10ProgramsByIdFavoriteAddPost(id, authorization),
  meta: {
    id,
    isFavorite: true
  }
});

export const removeFavoriteProgram = ({
  id,
  authorization
}: FavoriteActionProps): FavoriteActionType<CancelablePromise<any>> => ({
  type: SET_FAVORITE_PROGRAM,
  payload: programApi.v10ProgramsByIdFavoriteRemovePost(
    id,
    authorization
  ),
  meta: {
    id,
    isFavorite: false
  }
});

