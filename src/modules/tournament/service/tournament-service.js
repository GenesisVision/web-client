import pagingActionsFactory from "paging/actions/paging-actions";

const getPrograms = () => dispatch => {};

const updateProgramListPaging = paging => {
  const pagingActionsProgramList = pagingActionsFactory(/*actionTypes.PROGRAMS*/);
  return pagingActionsProgramList.updatePaging(paging);
};

const changeProgramListPage = paging => dispatch => {
  dispatch(updateProgramListPaging(paging));
  dispatch(getPrograms());
};

const tournamentService = { getPrograms, updateProgramListPaging };
