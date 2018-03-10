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

const shouldFetchTraders = traders => {
  return true;
};

const fetchTradersIfNeeded = traderId => (dispatch, getState) => {
  const traders = getState().tradersData.data;
  if (shouldFetchTraders(traders)) {
    return dispatch(fetchTraders());
  }
};

const tradersActions = {
  fetchTradersIfNeeded
};
export default tradersActions;
