import SwaggerInvestorApi from "../../../services/api-client/swagger-investor-api";

import * as actionTypes from "./tournament-actions.constants";

const fetchPrograms = (
  filters,
  onResolve = response => Promise.resolve(response)
) => {
  return {
    type: actionTypes.TOURNAMENT_PROGRAMS,
    payload: SwaggerInvestorApi.apiInvestorPlatformStatusGet(filters).then(
      onResolve
    )
  };
};

const tournamentActions = {
  fetchPrograms
};

export default tournamentActions;
