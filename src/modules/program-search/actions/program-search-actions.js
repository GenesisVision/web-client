//import SwaggerInvestorApi from "../../../services/api-client/swagger-investor-api";

import * as actionTypes from "./program-search-actions.constants";

const fetchPrograms = (
  filters,
  onResolve = response => Promise.resolve(response)
) => {
  return {
    type: actionTypes.PROGRAM_SEARCH,
    payload: Promise.resolve(true) //.then(onResolve)
  };
};

const programSearchActions = {
  fetchPrograms
};

export default programSearchActions;
