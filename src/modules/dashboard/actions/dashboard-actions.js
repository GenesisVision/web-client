import authService from "../../../services/auth-service";
import filesService from "../../../shared/services/file-service";
import SwaggerInvestorApi from "../../../services/api-client/swagger-investor-api";

import * as actionTypes from "./dashboard-actions.constants";

const fetchDashboardPrograms = () => {
  return {
    type: actionTypes.DASHBOARD_PROGRAMS,
    payload: SwaggerInvestorApi.apiInvestorDashboardGet(
      authService.getAuthArg(),
      { equityChartLength: 365 }
    ).then(response => {
      response.investmentPrograms.forEach(x => {
        x.logo = filesService.getFileUrl(x.logo);
      });

      return response;
    })
  };
};

const fetchFavoritesPrograms = () => {
  const data = {
    filter: { equityChartLength: 365, showMyFavorites: true },
    authorization: authService.getAuthArg()
  };
  return {
    type: actionTypes.FAVORITES_PROGRAMS,
    payload: SwaggerInvestorApi.apiInvestorInvestmentProgramsPost(data)
  }
}

const removeFavoriteProgram = (
  { programId, authorization },
  onResolve = response => Promise.resolve(response)
) => dispatch => {
  return dispatch({
    type: actionTypes.REMOVE_FAVORITE_PROGRAM,
    payload: SwaggerInvestorApi.apiInvestorInvestmentProgramsFavoritesRemovePost(
      programId,
      authorization
    ).then(() => Promise.resolve({ id: programId }))
  });
};

const fetchDashboardChart = () => {
  const data = {
    filter: {
      type: "Internal"
    }
  };
  return {
    type: actionTypes.DASHBOARD_CHART,
    payload: SwaggerInvestorApi.apiInvestorWalletStatisticPost(
      authService.getAuthArg(),
      data
    )
  };
};

const dashboardActions = { fetchDashboardPrograms, fetchDashboardChart, fetchFavoritesPrograms, removeFavoriteProgram };
export default dashboardActions;
