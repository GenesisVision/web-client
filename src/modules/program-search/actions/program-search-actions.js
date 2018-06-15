import SwaggerInvestorApi from "../../../services/api-client/swagger-investor-api";

import * as actionTypes from "./program-search-actions.constants";

const fetchPrograms = (
  filters,
  onResolve = response => Promise.resolve(response)
) => {
  return {
    type: actionTypes.PROGRAM_SEARCH,
    payload: () =>
      SwaggerInvestorApi.apiInvestorInvestmentProgramsPost(filters).then(
        onResolve
      ),
    meta: {
      scope: "qqq",
      debounce: {
        time: 300
      },
      once: ["debounce"]
    }
  };
};

const cancelFetchPrograms = () => ({
  type: actionTypes.PROGRAM_SEARCH,
  meta: {
    debounce: {
      cancel: true
    }
  }
});

const updateQuery = query => ({
  type: actionTypes.PROGRAM_SEARCH_QUERY_UPDATE,
  payload: query
});

const toggleState = isOpen => ({
  type: actionTypes.PROGRAM_SEARCH_STATE,
  isOpen
});

const programSearchActions = {
  updateQuery,
  fetchPrograms,
  cancelFetchPrograms,
  toggleState
};

export default programSearchActions;
