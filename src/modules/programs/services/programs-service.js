import authService from "services/auth-service";

import programActions from "../actions/programs-actions";

const getPrograms = () => (dispatch, getState) => {
  const filters = { take: 10 };
  if (authService.getAuthArg()) {
    filters.authorization = authService.getAuthArg();
  }
  dispatch(programActions.fetchPrograms(filters));
};

const programsService = {
  getPrograms
};
export default programsService;
