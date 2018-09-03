import authService from "services/auth-service";

import pagingActionsFactory from "../../../modules/paging/actions/paging-actions";
import {
  calculateSkipAndTake,
  calculateTotalPages
} from "../../../modules/paging/helpers/paging-helpers";
import sortingActionsFactory from "../../../modules/sorting/actions/sorting-actions";
import {
  DASHBOARD_PROGRAMS,
  fetchPrograms
} from "../actions/dashboard.actions";

export const getPrograms = () => (dispatch, getState) => {
  const filters = composeRequestFilters(getState);
  dispatch(fetchPrograms(authService.getAuthArg(), filters));
};

const composeRequestFilters = getState => {
  const { dashboard } = getState();
  const { itemsData, paging, sorting } = dashboard.programs;

  const { skip, take } = calculateSkipAndTake(paging);

  //const filtering = composeProgramsFilters(existingFilters.filtering);

  const filters = {
    skip,
    take,
    sorting
    //...filtering
  };

  return filters;
};

export const getProgramsFilters = () => (dispatch, getState) => {
  const { dashboard } = getState();
  const { itemsData, paging, sorting } = dashboard;

  const pages = calculateTotalPages(paging);

  const filtering = {};
  /*const filtering = PROGRAMS_DEFAULT_FILTERS.reduce((accum, cur) => {
    const { name, type, value, validate = value => true } = cur;
    if (!queryParams[name] || !validate(queryParams[name])) {
      accum[name] = {
        type,
        value
      };
    } else {
      accum[name] = {
        type,
        value: queryParams[name]
      };
    }
    return accum;
  }, {});
*/

  const filters = {
    page: paging.currentPage,
    pages,
    sorting,
    filtering
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
