import authService from "services/auth-service";

import {
  addFavoriteProgram,
  removeFavoriteProgram
} from "../actions/favorite-program.actions";

export const toggleFavoriteProgram = (programId, isFavorite) => dispatch => {
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
