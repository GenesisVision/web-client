import authService from "../../../services/auth-service";
import filesService from "../../../shared/services/file-service";
import SwaggerInvestorApi from "../../../services/api-client/swagger-investor-api";

import * as actionTypes from "./dashboard-actions.constants";

const getProgramLogoFileUrl = response => {
  response.investmentPrograms.forEach(x => {
    x.logo = filesService.getFileUrl(x.logo);
  });

  return response;
};

const fetchDashboardPrograms = () => {
  return {
    type: actionTypes.DASHBOARD_PROGRAMS,
    payload: SwaggerInvestorApi.apiInvestorDashboardGet(
      authService.getAuthArg(),
      { equityChartLength: 365 }
    ).then(getProgramLogoFileUrl)
  };
};

const fetchFavoritesPrograms = () => {
  const data = {
    filter: { equityChartLength: 365, showMyFavorites: true },
    authorization: authService.getAuthArg()
  };
  return {
    type: actionTypes.FAVORITES_PROGRAMS,
    payload: SwaggerInvestorApi.apiInvestorInvestmentProgramsPost(data).then(
      getProgramLogoFileUrl
    )
  };
};

const removeFavoriteProgram = (
  { id },
  onResolve = response => Promise.resolve(response)
) => dispatch => {
  return dispatch({
    type: actionTypes.REMOVE_FAVORITE_PROGRAM,
    payload: SwaggerInvestorApi.apiInvestorInvestmentProgramsFavoritesRemovePost(
      id,
      authService.getAuthArg()
    ).then(() => Promise.resolve({ id }))
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

const dashboardActions = {
  fetchDashboardPrograms,
  fetchDashboardChart,
  fetchFavoritesPrograms,
  removeFavoriteProgram
};
export default dashboardActions;
