import { Dispatch } from "redux";
import programsApi from "shared/services/api-client/programs-api";
import authService from "shared/services/auth-service";

import {
  addFavoriteProgram,
  removeFavoriteProgram
} from "../actions/favorite-program.actions";

export const toggleFavoriteProgramDispatchable = (
  programId: string,
  isFavorite: boolean
) => (dispatch: Dispatch) => {
  if (!authService.getAuthArg()) return;

  const requestData = {
    programId,
    authorization: authService.getAuthArg()
  };

  dispatch(
    isFavorite
      ? removeFavoriteProgram(requestData)
      : addFavoriteProgram(requestData)
  );
};

const addFavorite = (
  programId: string,
  authorization: string
): Promise<any> => {
  return programsApi.v10ProgramsByIdFavoriteAddPost(programId, authorization);
};

const removeFavorite = (
  programId: string,
  authorization: string
): Promise<any> => {
  return programsApi.v10ProgramsByIdFavoriteRemovePost(
    programId,
    authorization
  );
};

export const toggleFavoriteProgram = (
  programId: string,
  isFavorite: boolean
): Promise<any> => {
  if (!authService.getAuthArg()) return Promise.reject();
  const authorization = authService.getAuthArg();

  return isFavorite
    ? removeFavorite(programId, authorization)
    : addFavorite(programId, authorization);
};
