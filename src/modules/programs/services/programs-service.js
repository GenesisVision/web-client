import authService from "/services/auth-service";

const getPrograms = () => (dispatch, getState) => {
  const filters = {};
  if (authService.getAuthArg()) {
    filters.authorization = authService.getAuthArg();
  }
};

const programsService = {
  getPrograms
};
export default programsService;
