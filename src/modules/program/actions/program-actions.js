import authService from "../../../services/auth-service";
import SwaggerInvestorApi from "../../../services/api-client/swagger-investor-api";

import * as actionTypes from "./program-actions.constants";

const fetchProgram = programId => {
  let data = {};
  if (authService.getAuthArg()) {
    data.authorization = authService.getAuthArg();
  }

  return {
    type: actionTypes.PROGRAM_DETAIL,
    payload: SwaggerInvestorApi.apiManagerInvestmentProgramGet(programId, data)
  };
};

const fetchProgramHistory = programId => {
  return {
    type: actionTypes.PROGRAM_HISTORY,
    payload: SwaggerInvestorApi.apiInvestorInvestmentProgramTradesChartGet(
      programId
    )
  };
};

const fetchProgramRequests = filter => {
  return {
    type: actionTypes.PROGRAM_REQUESTS,
    payload: SwaggerInvestorApi.apiInvestorInvestmentProgramRequestsPost(
      authService.getAuthArg(),
      { filter }
    )
  };
};

const fetchProgramDeals = filter => {
  return {
    type: actionTypes.PROGRAM_DEALS,
    payload: SwaggerInvestorApi.apiInvestorInvestmentProgramTradesPost({
      filter
    })
  };
};

const cancelProgramRequest = requestId => {
  return {
    type: actionTypes.PROGRAM_CANCEL_REQUEST,
    payload: SwaggerInvestorApi.apiInvestorInvestmentCancelInvestmentRequestPost(
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
