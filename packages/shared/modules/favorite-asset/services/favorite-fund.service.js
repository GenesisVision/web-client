import fundsApi from "shared/services/api-client/funds-api";
import authService from "shared/services/auth-service";

import {
  addFavoriteFund,
  removeFavoriteFund
} from "../actions/favorite-fund.actions";

export const toggleFavoriteFundDispatchable = (id, isFavorite) => dispatch => {
  if (!authService.getAuthArg()) return;

  const requestData = {
    id,
    authorization: authService.getAuthArg()
  };

  dispatch(
    isFavorite ? removeFavoriteFund(requestData) : addFavoriteFund(requestData)
  );
};

const addFavorite = ({ id, authorization }) => {
  return fundsApi.v10FundsByIdFavoriteAddPost(id, authorization);
};

const removeFavorite = ({ id, authorization }) => {
  return fundsApi.v10FundsByIdFavoriteRemovePost(id, authorization);
};

export const toggleFavoriteFund = (id, isFavorite) => {
  if (!authService.getAuthArg()) return Promise.reject();

  const requestData = {
    id,
    authorization: authService.getAuthArg()
  };

  return isFavorite ? removeFavorite(requestData) : addFavorite(requestData);
};
