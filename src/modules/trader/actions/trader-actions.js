import authService from "../../../services/authService";
import filesService from "../../../shared/services/file-service";
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

const fetchTraderRequests = traderId => {
  const data = {
    filter: { investmentProgramId: traderId }
  };
  return {
    type: actionTypes.TRADER_REQUESTS,
    payload: SwaggerInvestorApi.apiInvestorInvestmentProgramRequestsPost(
      authService.getAuthArg(),
      data
    )
  };
};

const fetchTraderHistory = traderId => {
  const data = {
    filter: { investmentProgramId: traderId }
  };
  return {
    type: actionTypes.TRADER_HISTORY,
    payload: SwaggerInvestorApi.apiInvestorInvestmentProgramTradesPost(
      authService.getAuthArg(),
      data
    ).then(response => {
      return response.trades.map(x => ({ profit: x.profit, date: x.date }));
    })
  };
};

const cancelTraderRequest = requestId => {
  return {
    type: actionTypes.TRADER_CANCEL_REQUEST,
    payload: SwaggerInvestorApi.apiInvestorInvestmentProgramsCancelInvestmentRequestPost(
      requestId,
      authService.getAuthArg()
    )
  };
};

const traderActions = {
  fetchTrader,
  fetchTraderRequests,
  cancelTraderRequest,
  fetchTraderHistory
};

export default traderActions;
