import {
  calculateSkipAndTake,
  calculateTotalPages
} from "../../paging/helpers/paging-helpers";
import authService from "../../../services/auth-service";
import filteringActionsFactory from "../../filtering/actions/filtering-actions";
import pagingActionsFactory from "../../paging/actions/paging-actions";
import tournamentActions from "../actions/tournament-actions";

import { TOURNAMENT_PROGRAMS } from "../actions/tournament-actions.constants";
import { composeApiFiltering } from "../../filtering/helpers/filtering-helpers";

const getPrograms = () => (dispatch, getState) => {
  const { paging } = getState().tournamentData.programs;
  const { skip, take } = calculateSkipAndTake(paging);

  const { filtering } = getState().tournamentData.programs;

  let data = {
    filter: { skip, take, equityChartLength: 365 }
  };
  if (authService.getAuthArg()) {
    data.authorization = authService.getAuthArg();
  }
  data.filter = { ...data.filter, ...composeApiFiltering(filtering) };

  const setLogoAndOrder = response => {
    response.investmentPrograms.forEach((x, idx) => {
      x.order = skip + idx + 1;
    });

    return response;
  };

  return dispatch(tournamentActions.fetchPrograms(data, setLogoAndOrder)).then(
    response => {
      const totalPages = calculateTotalPages(response.value.total, take);
      dispatch(updateProgramListPaging({ totalPages }));
      return response;
    }
  );
};

const updateProgramListPaging = paging => {
  const pagingActionsProgramList = pagingActionsFactory(TOURNAMENT_PROGRAMS);
  return pagingActionsProgramList.updatePaging(paging);
};

const changeProgramListPage = paging => dispatch => {
  dispatch(updateProgramListPaging(paging));
  dispatch(getPrograms());
};

const updateFiltering = filter => {
  const filteringActions = filteringActionsFactory(TOURNAMENT_PROGRAMS);
  /*let filtering = {};
  switch (filter.name) {
    default: {
      filtering[filter.name] = filter.value;
    }
  }*/
  return filteringActions.updateFilter(filter);
};

const changeFilter = filter => dispatch => {
  dispatch(updateFiltering(filter));
  dispatch(updateProgramListPaging({ currentPage: 0 }));
  dispatch(getPrograms());
};

const updateAfterInvestment = () => dispatch => {
  return Promise.all([dispatch(getPrograms())]);
};

const tournamentService = {
  getPrograms,
  changeProgramListPage,
  changeFilter,
  updateAfterInvestment
};
export default tournamentService;
