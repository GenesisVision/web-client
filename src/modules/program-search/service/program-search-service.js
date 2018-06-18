import authService from "../../../services/auth-service";
import programSearchActions from "../actions/program-search-actions";
import { PROGRAM_SEARCH } from "../actions/program-search-actions.constants";
import clearDataActionFactory from "../../../shared/actions/clear-data.factory";

const getPrograms = query => (dispatch, getState) => {
  const [skip, take, sorting, name] = [0, 10, "ByTitleAsc", query];

  let data = {
    filter: { skip, take, sorting, name }
  };

  if (authService.getAuthArg()) {
    data.authorization = authService.getAuthArg();
  }

  const setLogoAndOrder = response => {
    response.investmentPrograms.forEach((x, idx) => {
      x.order = skip + idx + 1;
    });

    return response;
  };

  return dispatch(programSearchActions.fetchPrograms(data, setLogoAndOrder));
};

const updateQuery = query => dispatch => {
  dispatch(programSearchActions.updateQuery(query));
  dispatch(getPrograms(query));

  if (!query) {
    dispatch(programSearchActions.cancelFetchPrograms());
    const clearDataActions = clearDataActionFactory(PROGRAM_SEARCH);
    dispatch(clearDataActions.clearData());
  }
};

const openSearchBar = () => dispatch => {
  dispatch(programSearchActions.toggleOpenState(true));
  dispatch(programSearchActions.toggleFocusedState(true));
};

const closeSearchBar = () => dispatch => {
  dispatch(programSearchActions.toggleFocusedState(false));
  dispatch(programSearchActions.toggleOpenState(false));
};

const programSearchService = {
  updateQuery,
  openSearchBar,
  closeSearchBar
};

export default programSearchService;
