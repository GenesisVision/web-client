import { composeFilters } from "modules/filtering/helpers/filtering-helpers";
import pagingActionsFactory from "modules/paging/actions/paging-actions";
import {
  calculateSkipAndTake,
  calculateTotalPages
} from "modules/paging/helpers/paging-helpers";
import sortingActionsFactory from "modules/sorting/actions/sorting-actions";
import authService from "services/auth-service";

import filteringActionsFactory from "../../../modules/filtering/actions/filtering-actions";
import {
  DASHBOARD_PROGRAMS,
  fetchPrograms
} from "../actions/dashboard.actions";
import { DASHBOARD_PROGRAMS_FILTERS } from "../dashboard.constants";

export const getPrograms = () => (dispatch, getState) => {
  const filters = composeRequestFilters(getState);
  dispatch(fetchPrograms(authService.getAuthArg(), filters));
};

const composeRequestFilters = getState => {
  const { dashboard } = getState();
  const { itemsData, paging, sorting, filtering } = dashboard.programs;

  const { skip, take } = calculateSkipAndTake(paging);

  const composedFiltering = composeFilters(
    DASHBOARD_PROGRAMS_FILTERS,
    filtering
  );

  const filters = {
    skip,
    take,
    sorting,
    ...composedFiltering
  };

  return filters;
};

const updatePaging = paging => {
  const pagingActions = pagingActionsFactory(DASHBOARD_PROGRAMS);
  return pagingActions.updatePaging(paging);
};

export const changePage = paging => dispatch => {
  dispatch(updatePaging(paging));
  dispatch(getPrograms());
};

export const changeSorting = sorting => dispatch => {
  const sortingActions = sortingActionsFactory(DASHBOARD_PROGRAMS);
  dispatch(sortingActions.updateSorting(sorting));
  dispatch(
    updatePaging({
      currentPage: 0
    })
  );
  dispatch(getPrograms());
};

export const changeFilter = filter => dispatch => {
  const filteringActions = filteringActionsFactory(DASHBOARD_PROGRAMS);
  dispatch(filteringActions.updateFilter(filter));
  dispatch(
    updatePaging({
      currentPage: 0
    })
  );
  dispatch(getPrograms());
};
