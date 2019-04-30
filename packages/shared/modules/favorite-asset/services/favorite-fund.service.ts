import fundsApi from "shared/services/api-client/funds-api";
import authService from "shared/services/auth-service";
import { RootThunk } from "shared/utils/types";

import {
  addFavoriteFund,
  removeFavoriteFund
} from "../actions/favorite-fund.actions";

export type ToggleFavoriteFundDispatchableType = (
  id: string,
  isFavorite: boolean
) => RootThunk<void>;
export const toggleFavoriteFundDispatchable: ToggleFavoriteFundDispatchableType = (
  id,
  isFavorite
) => dispatch => {
  if (!authService.getAuthArg()) return;

  const requestData = {
    id,
    authorization: authService.getAuthArg()
  };

  dispatch(
    isFavorite ? removeFavoriteFund(requestData) : addFavoriteFund(requestData)
  );
};

const addFavorite = (id: string, authorization: string) => {
  return fundsApi.v10FundsByIdFavoriteAddPost(id, authorization);
};

const removeFavorite = (id: string, authorization: string) => {
  return fundsApi.v10FundsByIdFavoriteRemovePost(id, authorization);
};

export const toggleFavoriteFund = (
  id: string,
  isFavorite: boolean
): Promise<any> => {
  if (!authService.getAuthArg()) return Promise.reject();

  const auth = authService.getAuthArg();

  return isFavorite ? removeFavorite(id, auth) : addFavorite(id, auth);
};
