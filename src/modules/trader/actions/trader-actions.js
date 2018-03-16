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

const cancelTraderRequest = requestId => {
  return {
    type: actionTypes.TRADER_REQUESTS,
    payload: SwaggerInvestorApi.apiInvestorInvestmentProgramsCancelInvestmentRequestPost(
      requestId,
      authService.getAuthArg()
    )
  };
};

const traderActions = {
  fetchTrader,
  fetchTraderRequests,
  cancelTraderRequest
};

export default traderActions;
