import authService from "../../../services/auth-service";
import programSearchActions from "../actions/program-search-actions";

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

  return dispatch(
    programSearchActions.fetchPrograms(data, () => {
      var t = getState().programsData.programs.items;
      return t.data;
    })
  );
};

const updateQuery = query => (dispatch, getState) => {
  const { query: prevQuery } = getState().programSearchData.query;
  if (query === prevQuery) return;

  dispatch(getPrograms(query));
  return dispatch(programSearchActions.updateQuery(query));
};

const programSearchService = {
  updateQuery
};

export default programSearchService;
