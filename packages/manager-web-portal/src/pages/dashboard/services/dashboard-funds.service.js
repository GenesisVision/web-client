import authService from "services/auth-service";

import { calculateTotalPages } from "../../../modules/table/helpers/paging.helpers";
import { composeRequestFilters } from "../../../modules/table/services/table.service";
import * as actions from "../actions/dashboard.actions";
import { DASHBOARD_FUNDS_FILTERS } from "../dashboard.constants";

export const getDashboardFunds = filters => (dispatch, getState) => {
  const authorization = authService.getAuthArg();
  if (!filters) filters = getState().dashboard.funds.filters;
  let requestFilters = composeRequestFilters({
    ...filters,
    defaultFilters: DASHBOARD_FUNDS_FILTERS
  });
  dispatch(actions.fetchDashboardFunds(authorization, requestFilters)).then(
    response => {
      dispatch(
        actions.updateDashboardFundsFilters({
          ...filters,
          paging: {
            ...filters.paging,
            totalPages: calculateTotalPages(
              response.value.total,
              filters.paging.itemsOnPage
            )
          }
        })
      );
    }
  );
};

export const updateDashboardFundsFilters = filters => dispatch => {
  dispatch(actions.updateDashboardFundsFilters(filters));
};
