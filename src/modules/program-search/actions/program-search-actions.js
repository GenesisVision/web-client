//import SwaggerInvestorApi from "../../../services/api-client/swagger-investor-api";

import * as actionTypes from "./program-search-actions.constants";

const fetchPrograms = (
  filters,
  onResolve = response => Promise.resolve(response)
) => {
  return {
    type: actionTypes.PROGRAM_SEARCH,
    payload: Promise.resolve(true).then(onResolve)
  };
};

const updateQuery = query => ({
  type: actionTypes.PROGRAM_SEARCH_QUERY_UPDATE,
  payload: query
});

const programSearchActions = {
  updateQuery,
  fetchPrograms
};

export default programSearchActions;
