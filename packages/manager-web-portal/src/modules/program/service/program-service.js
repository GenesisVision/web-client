import clearDataActionFactory from "../../../shared/actions/clear-data.factory";
import fileServices from "../../../shared/services/file-service";
import history from "../../../utils/history";
import replaceParams from "../../../utils/replace-params";
import pagingActionsFactory from "../../paging/actions/paging-actions";
import {
  calculateSkipAndTake,
  calculateTotalPages,
  composePaingActionType
} from "../../paging/helpers/paging-helpers";
import { PROGRAM_SETTINGS_EDIT_ROUTE } from "../../program-settings/program-settings.constants";
import programActions from "../actions/program-actions";
import * as actionTypes from "../actions/program-actions.constants";

const fetchProgram = programId => dispatch => {
  return dispatch(
    programActions.fetchProgram(
      programId,
      fileServices.addLogoSrc("investmentProgram")
    )
  );
};

const updateAfterInvestment = programId => dispatch => {
  return Promise.all([
    dispatch(fetchProgram(programId)),
    dispatch(getProgramRequests(programId))
  ]);
};

const getProgramRequests = programId => (dispatch, getState) => {
  const { paging } = getState().programData.requests;
  const { skip, take } = calculateSkipAndTake(paging);

  const filter = { investmentProgramId: programId, skip, take };

  return dispatch(programActions.fetchProgramRequests(filter)).then(
    response => {
      const totalPages = calculateTotalPages(response.value.total);
      dispatch(updateProgramRequestListPaging({ totalPages }));
    }
  );
};

const getProgramDeals = programId => (dispatch, getState) => {
  const { paging } = getState().programData.deals;
  const { skip, take } = calculateSkipAndTake(paging);

  const filter = {
    investmentProgramId: programId,
    sorting: "ByDateDesc",
    skip,
    take
  };
  return dispatch(programActions.fetchProgramDeals(filter)).then(response => {
    const totalPages = calculateTotalPages(response.value.total);
    return dispatch(updateProgramDealListPaging({ totalPages }));
  });
};

const updateProgramRequestListPaging = paging => {
  const pagingActionsRequestList = pagingActionsFactory(
    actionTypes.PROGRAM_REQUESTS
  );
  return pagingActionsRequestList.updatePaging(paging);
};

const changeProgramRequestsPage = (programId, paging) => dispatch => {
  dispatch(updateProgramRequestListPaging(paging));
  dispatch(getProgramRequests(programId));
};

const updateProgramDealListPaging = paging => {
  const pagingActionsDealList = pagingActionsFactory(actionTypes.PROGRAM_DEALS);
  return pagingActionsDealList.updatePaging(paging);
};

const changeProgramDealsPage = (programId, paging) => dispatch => {
  dispatch(updateProgramDealListPaging(paging));
  dispatch(getProgramDeals(programId));
};

const cancelProgramRequest = (programId, requestId) => dispatch => {
  return dispatch(programActions.cancelProgramRequest(requestId))
    .then(() => dispatch(getProgramRequests(programId)))
    .then(() => dispatch(fetchProgram(programId)));
};

const openEditProgramPage = programId => {
  history.push(
    replaceParams(PROGRAM_SETTINGS_EDIT_ROUTE, {
      ":programId": programId
    })
  );
};

const clearProgram = () => dispatch => {
  const clearDataActions = [
    clearDataActionFactory(actionTypes.PROGRAM_DETAIL),
    clearDataActionFactory(actionTypes.PROGRAM_DEALS),
    clearDataActionFactory(actionTypes.PROGRAM_HISTORY),
    clearDataActionFactory(actionTypes.PROGRAM_REQUESTS),
    clearDataActionFactory(composePaingActionType(actionTypes.PROGRAM_DEALS)),
    clearDataActionFactory(composePaingActionType(actionTypes.PROGRAM_REQUESTS))
  ];

  clearDataActions.forEach(x => dispatch(x.clearData()));
};

const programService = {
  updateAfterInvestment,
  getProgramRequests,
  getProgramDeals,
  changeProgramRequestsPage,
  changeProgramDealsPage,
  cancelProgramRequest,
  openEditProgramPage,
  clearProgram,
  fetchProgram
};
export default programService;
