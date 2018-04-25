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
  return {
    type: actionTypes.FAVORITES_PROGRAMS,
    payload: SwaggerInvestorApi.apiInvestorInvestmentProgramsPost({ showMyFavorites: true }, authService.getAuthArg())
  }
}

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

const dashboardActions = { fetchDashboardPrograms, fetchDashboardChart, fetchFavoritesPrograms };
export default dashboardActions;
