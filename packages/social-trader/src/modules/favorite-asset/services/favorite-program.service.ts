import { CancelablePromise } from "gv-api-web";
import programsApi from "services/api-client/programs-api";
import authService from "services/auth-service";

import {
  addFavoriteProgramAction,
  removeFavoriteProgramAction
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
      ? removeFavoriteProgramAction(requestData)
      : addFavoriteProgramAction(requestData)
  );
};

const addFavorite = (
  id: string,
  authorization: string
): CancelablePromise<any> => programsApi.addToFavorites(id, authorization);

const removeFavorite = (
  id: string,
  authorization: string
): CancelablePromise<any> => programsApi.removeFromFavorites(id, authorization);

export const toggleFavoriteProgram = ({
  id,
  isFavorite
}: {
  id: string;
  isFavorite: boolean;
}): CancelablePromise<any> => {
  if (!authService.getAuthArg())
    return Promise.reject() as CancelablePromise<any>;
  const authorization = authService.getAuthArg();

  return isFavorite
    ? removeFavorite(id, authorization)
    : addFavorite(id, authorization);
};
