import authService from "../../../services/auth-service";
import SwaggerManagerApi from "../../../services/api-client/swagger-manager-api";

import * as actionTypes from "./program-actions.constants";

const fetchProgram = programId => {
  let data = {};
  if (authService.getAuthArg()) {
    data.authorization = authService.getAuthArg();
  }

  return {
    type: actionTypes.PROGRAM_DETAIL,
    payload: SwaggerManagerApi.apiManagerInvestmentProgramGet(programId, data)
  };
};

const fetchProgramHistory = programId => {
  return {
    type: actionTypes.PROGRAM_HISTORY,
    payload: SwaggerManagerApi.apiManagerInvestmentProgramTradesChartGet(
      programId
    )
  };
};

const fetchProgramRequests = filter => {
  return {
    type: actionTypes.PROGRAM_REQUESTS,
    payload: SwaggerManagerApi.apiManagerInvestmentProgramRequestsPost(
      authService.getAuthArg(),
      { filter }
    )
  };
};

const fetchProgramDeals = filter => {
  return {
    type: actionTypes.PROGRAM_DEALS,
    payload: SwaggerManagerApi.apiManagerInvestmentProgramTradesPost({
      filter
    })
  };
};

const cancelProgramRequest = requestId => {
  return {
    type: actionTypes.PROGRAM_CANCEL_REQUEST,
    payload: SwaggerManagerApi.apiManagerInvestmentCancelInvestmentRequestPost(
      requestId,
      authService.getAuthArg()
    )
  };
};

const programActions = {
  fetchProgram,
  fetchProgramHistory,
  fetchProgramRequests,
  fetchProgramDeals,
  cancelProgramRequest
};

export default programActions;
