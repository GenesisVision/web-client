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
    programSearchActions.fetchPrograms(data).then(setLogoAndOrder)
  );
};

const programSearchService = {
  getPrograms
};

export default programSearchService;
