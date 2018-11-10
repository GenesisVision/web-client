import fundsApi from "shared/services/api-client/funds-api";

export const SET_FAVORITE_FUND = "SET_FAVORITE_FUND";

export const addFavoriteFund = ({ id, authorization }) => {
  return {
    type: SET_FAVORITE_FUND,
    payload: fundsApi.v10FundsByIdFavoriteAddPost(id, authorization),
    meta: {
      id,
      isFavorite: true
    }
  };
};

export const removeFavoriteFund = ({ id, authorization }) => {
  return {
    type: SET_FAVORITE_FUND,
    payload: fundsApi.v10FundsByIdFavoriteRemovePost(id, authorization),
    meta: {
      id,
      isFavorite: false
    }
  };
};
