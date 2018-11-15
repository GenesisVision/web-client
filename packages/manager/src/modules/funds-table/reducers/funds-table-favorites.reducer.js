import { SET_FAVORITE_FUND } from "shared/modules/favorite-asset/actions/favorite-fund.actions";
import {
  FAILURE_SUFFIX,
  REQUEST_SUFFIX
} from "shared/reducers/api-reducer/api-reducer";

const updateFavoriteLocal = (state, id, isFavorite) => {
  return {
    ...state,
    data: {
      ...state.data,
      funds: state.data.funds.map(fund => {
        if (fund.id === id) {
          return {
            ...fund,
            personalDetails: {
              ...fund.personalDetails,
              isFavorite: isFavorite
            }
          };
        }
        return fund;
      })
    }
  };
};

const favoritesReducer = (state, action) => {
  switch (action.type) {
    case `${SET_FAVORITE_FUND}_${REQUEST_SUFFIX}`:
      return updateFavoriteLocal(state, action.meta.id, action.meta.isFavorite);
    case `${SET_FAVORITE_FUND}_${FAILURE_SUFFIX}`: {
      return updateFavoriteLocal(
        state,
        action.meta.id,
        !action.meta.isFavorite
      );
    }
    default:
      return state;
  }
};

export default favoritesReducer;
