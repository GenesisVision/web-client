import { programsApiProxy } from "shared/services/api-client/programs-api";
import authService from "shared/services/auth-service";

import {
  addFavoriteProgram,
  removeFavoriteProgram
} from "../actions/favorite-program.actions";

export const toggleFavoriteProgramDispatchable = (
  programId,
  isFavorite
) => dispatch => {
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

const addFavorite = ({ programId, authorization }) => {
  return programsApiProxy.v10ProgramsByIdFavoriteAddPost(
    programId,
    authorization
  );
};

const removeFavorite = ({ programId, authorization }) => {
  return programsApiProxy.v10ProgramsByIdFavoriteRemovePost(
    programId,
    authorization
  );
};

export const toggleFavoriteProgram = (programId, isFavorite) => {
  if (!authService.getAuthArg()) return Promise.reject();

  const requestData = {
    programId,
    authorization: authService.getAuthArg()
  };

  return isFavorite ? removeFavorite(requestData) : addFavorite(requestData);
};
