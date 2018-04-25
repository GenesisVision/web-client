import apiReducerFactory, {
  SUCCESS_SUFFIX
} from "../../../shared/reducers/api-reducer/api-reducer";

import {
  FAVORITES_PROGRAMS,
  REMOVE_FAVORITE_PROGRAM
} from "../actions/dashboard-actions.constants";

function investmentPrograms(state, action) {
  switch (action.type) {
    case `${REMOVE_FAVORITE_PROGRAM}_${SUCCESS_SUFFIX}`:
        console.info(state);
      return state;
    default:
      return state;
  }
}

const dashboardFavoritePrograms = apiReducerFactory(
  {
    apiType: FAVORITES_PROGRAMS
  },
  investmentPrograms
);
export default dashboardFavoritePrograms;
