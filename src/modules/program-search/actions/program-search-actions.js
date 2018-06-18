import SwaggerInvestorApi from "../../../services/api-client/swagger-investor-api";

import * as actionTypes from "./program-search-actions.constants";
import { PROGRAM_SEARCH_LOADING_BAR_SCOPE } from "../program.search.constants";

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
      scope: PROGRAM_SEARCH_LOADING_BAR_SCOPE,
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

const toggleOpenState = isOpen => ({
  type: actionTypes.PROGRAM_SEARCH_OPEN_STATE,
  isOpen
});

const toggleFocusedState = isFocused => ({
  type: actionTypes.PROGRAM_SEARCH_FOCUSED_STATE,
  isFocused
});

const programSearchActions = {
  updateQuery,
  fetchPrograms,
  cancelFetchPrograms,
  toggleOpenState,
  toggleFocusedState
};

export default programSearchActions;
