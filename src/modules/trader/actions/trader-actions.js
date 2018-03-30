import {
  calculateSkipAndTake,
  calculateTotalPages
} from "../../paging/helpers/paging-helpers";
import authService from "../../../services/auth-service";
import filesService from "../../../shared/services/file-service";
import pagingActionsFactory from "../../paging/actions/paging-actions";
import SwaggerInvestorApi from "../../../services/api-client/swagger-investor-api";

import * as actionTypes from "./trader-actions.constants";

const fetchTrader = traderId => {
  let data = {};
  if (authService.getAuthArg()) {
    data.authorization = authService.getAuthArg();
  }

  return {
    type: actionTypes.TRADER_DETAIL,
    payload: SwaggerInvestorApi.apiInvestorInvestmentProgramGet(
      traderId,
      data
    ).then(response => {
      const trader = response.investmentProgram;
      trader.logo = filesService.getFileUrl(trader.logo);
      return response;
    })
  };
};

const fetchTraderHistory = traderId => {
  return {
    type: actionTypes.TRADER_HISTORY,
    payload: SwaggerInvestorApi.apiInvestorInvestmentProgramTradesChartGet(
      traderId
    )
  };
};

const fetchTraderRequests = traderId => (dispatch, getState) => {
  const { paging } = getState().traderData.requests;
  const { skip, take } = calculateSkipAndTake(paging);

  const filter = { investmentProgramId: traderId, skip, take };

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
  traderId,
  paging
) => dispatch => {
  dispatch(updateTraderRequestListPaging(paging));
  dispatch(fetchTraderRequests(traderId));
};

const fetchTraderDealList = traderId => (dispatch, getState) => {
  const { paging } = getState().traderData.deals;
  const { skip, take } = calculateSkipAndTake(paging);

  const filter = {
    investmentProgramId: traderId,
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

const updateTraderDealListPagingAndFetch = (traderId, paging) => dispatch => {
  dispatch(updateTraderDealListPaging(paging));
  dispatch(fetchTraderDealList(traderId));
};

const cancelTraderRequest = (traderId, requestId) => dispatch => {
  return dispatch({
    type: actionTypes.TRADER_CANCEL_REQUEST,
    payload: SwaggerInvestorApi.apiInvestorInvestmentProgramsCancelInvestmentRequestPost(
      requestId,
      authService.getAuthArg()
    )
  })
    .then(() => dispatch(traderActions.fetchTraderRequests(traderId)))
    .then(() => dispatch(traderActions.fetchTrader(traderId)));
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
