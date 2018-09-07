import tableServiceFactory from "modules/table/services/table.service";
import authService from "services/auth-service";

import {
  GLOBAL_SEARCH_PROGRAMS,
  fetchPrograms
} from "../actions/global-serch.actions";

export const getGlobalSearchProgramsStorePlace = store =>
  store.globalSearch.result;

export const globalSearchResult = tableServiceFactory({
  type: GLOBAL_SEARCH_PROGRAMS,
  fetchItems: (filters, state) => {
    const { queryValue } = state.globalSearch;
    if (queryValue.length === "") return null;
    filters = { ...filters, mask: queryValue };
    return fetchPrograms(authService.getAuthArg(), filters);
  },
  getStorePlace: getGlobalSearchProgramsStorePlace
});
