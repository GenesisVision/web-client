import SwaggerManagerApi from "../../../services/api-client/swagger-manager-api";
import authService from "../../../services/auth-service";
import filteringActionsFactory from "../../filtering/actions/filtering-actions";
import * as actionTypes from "./dashboard-actions.constants";

const fetchDashboardPrograms = (filter, onResolve = data => data) => {
  return {
    type: actionTypes.DASHBOARD_PROGRAMS,
    payload: SwaggerManagerApi.apiManagerDashboardProgramsPost(
      authService.getAuthArg(),
      { filter }
    ).then(onResolve)
  };
};

const fetchDashboardInfo = () => {
  return {
    type: actionTypes.DASHBOARD_INFO,
    payload: SwaggerManagerApi.apiManagerDashboardStatisticGet(
      authService.getAuthArg()
    )
  };
};

const dashboardFiltering = filter => {
  const filteringActions = filteringActionsFactory(
    actionTypes.DASHBOARD_PROGRAMS
  );
  return filteringActions.updateFilter(filter);
};

const updateFiltering = filter => dispatch => {
  dispatch(dashboardFiltering(filter));
};

const dashboardActions = {
  fetchDashboardPrograms,
  fetchDashboardInfo,
  updateFiltering
};
export default dashboardActions;
