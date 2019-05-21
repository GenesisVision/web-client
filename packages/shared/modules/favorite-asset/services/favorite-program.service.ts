import programsApi from "shared/services/api-client/programs-api";
import authService from "shared/services/auth-service";

import {
  addFavoriteProgram,
  removeFavoriteProgram
} from "../actions/favorite-program.actions";
import { ToggleFavoriteDispatchableType } from "./favorite-fund.service";

export const toggleFavoriteProgramDispatchable: ToggleFavoriteDispatchableType = (
  id,
  isFavorite
) => dispatch => {
  if (!authService.getAuthArg()) return;

  const requestData = {
    id,
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
  id: string,
  isFavorite: boolean
): Promise<any> => {
  if (!authService.getAuthArg()) return Promise.reject();
  const authorization = authService.getAuthArg();

  return isFavorite
    ? removeFavorite(id, authorization)
    : addFavorite(id, authorization);
};
