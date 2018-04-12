import {
  calculateSkipAndTake,
  calculateTotalPages
} from "../../paging/helpers/paging-helpers";
import authService from "../../../services/auth-service";
import filesService from "../../../shared/services/file-service";
import pagingActionsFactory from "../../paging/actions/paging-actions";
import SwaggerInvestorApi from "../../../services/api-client/swagger-investor-api";

import * as actionTypes from "./trader-actions.constants";

const fetchTrader = programId => {
  let data = {};
  if (authService.getAuthArg()) {
    data.authorization = authService.getAuthArg();
  }

  return {
    type: actionTypes.TRADER_DETAIL,
    payload: SwaggerInvestorApi.apiInvestorInvestmentProgramGet(
      programId,
      data
    ).then(response => {
      const trader = response.investmentProgram;
      trader.logo = filesService.getFileUrl(trader.logo);
      return response;
    })
  };
};

const fetchTraderHistory = programId => {
  return {
    type: actionTypes.TRADER_HISTORY,
    payload: SwaggerInvestorApi.apiInvestorInvestmentProgramTradesChartGet(
      programId
    )
  };
};

const fetchTraderRequests = programId => (dispatch, getState) => {
  const { paging } = getState().traderData.requests;
  const { skip, take } = calculateSkipAndTake(paging);

  const filter = { investmentProgramId: programId, skip, take };

  return dispatch({
    type: actionTypes.TRADER_REQUESTS,
    payload: SwaggerInvestorApi.apiInvestorInvestmentProgramRequestsPost(
      authService.getAuthArg(),
      { filter }
    )
  }).then(response => {
    const totalPages = calculateTotalPages(response.value.total);
    dispatch(updateTraderRequestListPaging({ totalPages }));
  });
};

const updateTraderRequestListPaging = paging => {
  const pagingActionsDealList = pagingActionsFactory(
    actionTypes.TRADER_REQUESTS
  );
  return pagingActionsDealList.updatePaging(paging);
};

const updateTraderRequestListPagingAndFetch = (
  programId,
  paging
) => dispatch => {
  dispatch(updateTraderRequestListPaging(paging));
  dispatch(fetchTraderRequests(programId));
};

const fetchTraderDealList = programId => (dispatch, getState) => {
  const { paging } = getState().traderData.deals;
  const { skip, take } = calculateSkipAndTake(paging);

  const filter = {
    investmentProgramId: programId,
    sorting: "ByDateDesc",
    skip,
    take
  };
  return dispatch({
    type: actionTypes.TRADER_DEALS,
    payload: SwaggerInvestorApi.apiInvestorInvestmentProgramTradesPost({
      filter
    })
  }).then(response => {
    const totalPages = calculateTotalPages(response.value.total);
    return dispatch(updateTraderDealListPaging({ totalPages }));
  });
};

const updateTraderDealListPaging = paging => {
  const pagingActionsDealList = pagingActionsFactory(actionTypes.TRADER_DEALS);
  return pagingActionsDealList.updatePaging(paging);
};

const updateTraderDealListPagingAndFetch = (programId, paging) => dispatch => {
  dispatch(updateTraderDealListPaging(paging));
  dispatch(fetchTraderDealList(programId));
};

const cancelTraderRequest = (programId, requestId) => dispatch => {
  return dispatch({
    type: actionTypes.TRADER_CANCEL_REQUEST,
    payload: SwaggerInvestorApi.apiInvestorInvestmentProgramsCancelInvestmentRequestPost(
      requestId,
      authService.getAuthArg()
    )
  })
    .then(() => dispatch(traderActions.fetchTraderRequests(programId)))
    .then(() => dispatch(traderActions.fetchTrader(programId)));
};

const traderActions = {
  fetchTrader,
  fetchTraderHistory,
  fetchTraderRequests,
  cancelTraderRequest,
  updateTraderRequestListPaging,
  updateTraderRequestListPagingAndFetch,
  fetchTraderDealList,
  updateTraderDealListPaging,
  updateTraderDealListPagingAndFetch
};

export default traderActions;
