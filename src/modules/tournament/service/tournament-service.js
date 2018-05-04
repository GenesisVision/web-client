import pagingActionsFactory from "../../paging/actions/paging-actions";

import { TOURNAMENT_PROGRAMS } from "../actions/tournament-actions.constants";
import filteringActionsFactory from "../../filtering/actions/filtering-actions";

const getPrograms = () => dispatch => {};

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
  let filtering = {};
  switch (filter.name) {
    default: {
      filtering[filter.name] = filter.value;
    }
  }
  return filteringActions.updateFiltering(filtering);
};

const changeFilter = filter => dispatch => {
  dispatch(updateFiltering(filter));
  dispatch(updateProgramListPaging({ currentPage: 0 }));
  dispatch(getPrograms());
};

const tournamentService = { getPrograms, changeProgramListPage, changeFilter };
export default tournamentService;
