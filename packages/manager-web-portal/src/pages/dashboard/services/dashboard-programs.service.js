import authService from "shared/services/auth-service";

import { calculateTotalPages } from "shared/components/table/helpers/paging.helpers";
import { composeRequestFilters } from "../../../modules/table/services/table.service";
import * as actions from "../actions/dashboard.actions";
import { DASHBOARD_PROGRAMS_FILTERS } from "../dashboard.constants";

export const getDashboardPrograms = filters => (dispatch, getState) => {
  const authorization = authService.getAuthArg();
  if (!filters) filters = getState().dashboard.programs.filters;
  let requestFilters = composeRequestFilters({
    ...filters,
    defaultFilters: DASHBOARD_PROGRAMS_FILTERS
  });
  dispatch(actions.fetchDashboardPrograms(authorization, requestFilters)).then(
    response => {
      dispatch(
        actions.updateDashboardProgramsFilters({
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

export const updateDashboardProgramsFilters = filters => dispatch => {
  dispatch(actions.updateDashboardProgramsFilters(filters));
};
