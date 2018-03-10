import authService from "../../../services/authService";
import filesService from "../../../shared/services/file-service";
import SwaggerInvestorApi from "../../../services/api-client/swagger-investor-api";

import * as actionTypes from "./traders-actions.constants";

const fetchTraders = () => {
  return {
    type: actionTypes.TRADERS,
    payload: SwaggerInvestorApi.apiInvestorInvestmentProgramsPost().then(
      response => {
        response.investmentPrograms.forEach(x => {
          x.logo = filesService.getFileUrl(x.logo);
        });

        return response;
      }
    )
  };
};

const fetchTrader = traderId => {
  const data = {};
  if (authService.getAuthArg()) {
    data.authorization = authService.getAuthArg();
  }

  return {
    type: actionTypes.TRADER,
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

const shouldFetchTraders = traders => {
  return true;
};

const fetchTradersIfNeeded = traderId => (dispatch, getState) => {
  const traders = getState().tradersData.data;
  if (shouldFetchTraders(traders)) {
    return dispatch(fetchTraders());
  }
};

const cancelRequest = requestId => {
  const data = {
    requestId
  };
  return {
    type: actionTypes.TRADER_REQUESTS,
    payload: SwaggerInvestorApi.apiInvestorInvestmentProgramsCancelInvestmentRequestPost(
      requestId,
      authService.getAuthArg()
    )
  };
};

const tradersActions = {
  fetchTradersIfNeeded,
  fetchTrader,
  fetchTraderRequests,
  cancelRequest
};
export default tradersActions;
