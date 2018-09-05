import tableServiceFactory from "modules/table/services/table.service";
import authService from "services/auth-service";

import {
  DASHBOARD_PROGRAMS,
  fetchPrograms
} from "../actions/dashboard.actions";
import { DASHBOARD_PROGRAMS_FILTERS } from "../dashboard.constants";

export const getStorePlace = store => store.dashboard.programs;

export default tableServiceFactory({
  type: DASHBOARD_PROGRAMS,
  fetchItems: filters => fetchPrograms(authService.getAuthArg(), filters),
  getStorePlace,
  defaultFilters: DASHBOARD_PROGRAMS_FILTERS
});
