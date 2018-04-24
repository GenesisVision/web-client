import SwaggerInvestorApi from "../../../services/api-client/swagger-investor-api";

import * as actionTypes from "./programs-actions.constants";

const fetchPrograms = (
  filters,
  onResolve = response => Promise.resolve(response)
) => {
  return {
    type: actionTypes.PROGRAMS,
    payload: SwaggerInvestorApi.apiInvestorInvestmentProgramsPost(filters).then(
      onResolve
    )
  };
};

const addFavoriteProgram = (
  { programId, authorization },
  onResolve = response => Promise.resolve(response)
) => dispatch => {
  return dispatch({
    type: actionTypes.PROGRAMS_FAVORITE,
    payload: SwaggerInvestorApi.apiInvestorInvestmentProgramsFavoritesAddPost(
      programId,
      authorization
    ).then(() => Promise.resolve({ id: programId }))
  });
};

const removeFavoriteProgram = (
  { programId, authorization },
  onResolve = response => Promise.resolve(response)
) => dispatch => {
  return dispatch({
    type: actionTypes.PROGRAMS_FAVORITE,
    payload: SwaggerInvestorApi.apiInvestorInvestmentProgramsFavoritesRemovePost(
      programId,
      authorization
    ).then(() => Promise.resolve({ id: programId }))
  });
};

const programsActions = {
  addFavoriteProgram,
  removeFavoriteProgram,
  fetchPrograms
};
export default programsActions;
