import SwaggerInvestorApi from "../../../services/api-client/swagger-investor-api";

import * as actionTypes from "./traders-actions.constants";

const fetchTraders = () => {
  return {
    type: actionTypes.TRADERS,
    payload: SwaggerInvestorApi.apiInvestorInvestmentProgramsPost()
  };
};

const fetchTrader = traderId => {
  return {
    type: actionTypes.TRADER,
    payload: SwaggerInvestorApi.apiInvestorInvestmentProgramGet(traderId)
  };
};

const tradersActions = { fetchTraders, fetchTrader };
export default tradersActions;
