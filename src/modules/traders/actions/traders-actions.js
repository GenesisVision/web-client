import SwaggerInvestorApi from "../../../services/api-client/swagger-investor-api";

import * as actionTypes from "./traders-actions.constants";

const fetchTraders = () => {
  return {
    type: actionTypes.TRADERS,
    payload: SwaggerInvestorApi.apiInvestorInvestmentsPost()
  };
};

const tradersActions = { fetchTraders };
export default tradersActions;
