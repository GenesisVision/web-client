import { CancelablePromise } from "gv-api-web";
import programsApi from "shared/services/api-client/programs-api";
import authService from "shared/services/auth-service";

import {
  addFavoriteFollowAction,
  removeFavoriteFollowAction
} from "../actions/favorite-follow.actions";
import { ToggleFavoriteDispatchableType } from "./favorite-fund.service";

export const toggleFavoriteFollowDispatchable: ToggleFavoriteDispatchableType = (
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
      ? removeFavoriteFollowAction(requestData)
      : addFavoriteFollowAction(requestData)
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

export const toggleFavoriteFollow = ({
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
