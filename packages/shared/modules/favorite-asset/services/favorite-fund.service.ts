import fundsApi from "shared/services/api-client/funds-api";
import authService from "shared/services/auth-service";
import { RootThunk } from "shared/utils/types";

import {
  addFavoriteFundAction,
  removeFavoriteFundAction
} from "../actions/favorite-fund.actions";

export type ToggleFavoriteDispatchableType = (
  id: string,
  isFavorite: boolean
) => RootThunk<void>;
export const toggleFavoriteFundDispatchable: ToggleFavoriteDispatchableType = (
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
      ? removeFavoriteFundAction(requestData)
      : addFavoriteFundAction(requestData)
  );
};

const addFavorite = (id: string, authorization: string) => {
  return fundsApi.addToFavorites(id, authorization);
};

const removeFavorite = (id: string, authorization: string) => {
  return fundsApi.removeFromFavorites(id, authorization);
};

export const toggleFavoriteFund = (
  id: string,
  isFavorite: boolean
): Promise<any> => {
  if (!authService.getAuthArg()) return Promise.reject();

  const auth = authService.getAuthArg();

  return isFavorite ? removeFavorite(id, auth) : addFavorite(id, auth);
};
