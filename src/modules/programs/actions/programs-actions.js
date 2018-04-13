import SwaggerInvestorApi from "../../../services/api-client/swagger-investor-api";

import * as actionTypes from "./programs-actions.constants";

const fetchPrograms = (
  filters,
  onResolve = response => Promise.resolve(response)
) => {
  return {
    type: actionTypes.PROGRAMS,
    payload: SwaggerInvestorApi.apiInvestorInvestmentProgramsPost(filters).then(
      onResolve
    )
  };
};

const programsActions = {
  fetchPrograms
};
export default programsActions;
