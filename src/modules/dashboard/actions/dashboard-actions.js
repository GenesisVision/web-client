import authService from "../../../services/authService";
import SwaggerInvestorApi from "../../../services/api-client/swagger-investor-api";

import * as actionTypes from "./dashboard-actions.constants";

const fetchDashboard = () => {
  return {
    type: actionTypes.DASHBOARD,
    payload: SwaggerInvestorApi.apiInvestorDashboardGet(
      authService.getAuthArg()
    )
  };
};

const dashboardActions = { fetchDashboard };
export default dashboardActions;
