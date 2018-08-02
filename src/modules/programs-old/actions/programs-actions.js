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

const favoriteProgramCreator = ACTION_SUFFIX => {
  const addFavoriteProgram = (
    { programId, authorization },
    onResolve = response => Promise.resolve(response)
  ) => dispatch => {
    return dispatch({
      type: ACTION_SUFFIX,
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
      type: ACTION_SUFFIX,
      payload: SwaggerInvestorApi.apiInvestorInvestmentProgramsFavoritesRemovePost(
        programId,
        authorization
      ).then(() => Promise.resolve({ id: programId }))
    });
  };

  return {
    addFavoriteProgram,
    removeFavoriteProgram
  };
};

const programsActions = {
  fetchPrograms,
  favoriteProgramCreator
};
export default programsActions;
