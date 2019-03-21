import {
  FAILURE_SUFFIX,
  IApiState,
  REQUEST_SUFFIX
} from "shared/reducers/api-reducer/api-reducer";
import { FundsList } from "gv-api-web";
import { SET_FAVORITE_FUND } from "shared/modules/favorite-asset/actions/favorite-fund.actions";

const updateFavoriteLocal = (
  state: IApiState<FundsList>,
  id: string,
  isFavorite: boolean
): IApiState<FundsList> => {
  return {
    ...state,
    data: {
      ...state.data,
      total: (state.data && state.data.funds.length) || 0,
      funds:
        (state.data &&
          state.data.funds.map(fund => {
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
          })) ||
        []
    }
  };
};

const favoritesReducer = (
  state: IApiState<FundsList>,
  action: any
): IApiState<FundsList> => {
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
