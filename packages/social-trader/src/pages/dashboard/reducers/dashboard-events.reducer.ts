import {
  DASHBOARD_PORTFOLIO_EVENTS_DEFAULT_FILTERING,
  DASHBOARD_PORTFOLIO_EVENTS_FILTERS,
  EVENTS_ACTION_TYPE
} from "components/portfolio-events-table/portfolio-events-table.constants";
import { tableSelectorCreator } from "components/table/helpers/table.selector";
import { DEFAULT_PAGING } from "components/table/reducers/table-paging.reducer";
import tableReducerFactory from "components/table/reducers/table.reducer";
import { InvestmentEventViewModels } from "gv-api-web";
import { AuthRootState } from "reducers";
import apiReducerFactory, {
  IApiState
} from "reducers/reducer-creators/api-reducer";
import { RootState } from "reducers/root-reducer";
import { apiSelector } from "utils/selectors";

import { DASHBOARD_PORTFOLIO_EVENTS } from "../actions/dashboard.actions";

export type ManagerPortfolioEventsState = IApiState<InvestmentEventViewModels>;

const dashboardEventsReducer = apiReducerFactory<InvestmentEventViewModels>({
  apiType: DASHBOARD_PORTFOLIO_EVENTS
});
export default dashboardEventsReducer;

export const dashboardEventsAllSelector = (state: RootState) =>
  //@ts-ignore
  state.dashboard.eventsTable;

export const dashboardEventsAllTableSelector = tableSelectorCreator<
  AuthRootState,
  InvestmentEventViewModels,
  InvestmentEventViewModels
>(dashboardEventsAllSelector, "events", {
  items: undefined,
  total: 0
});

export const dashboardEventsAllReducer = tableReducerFactory<
  InvestmentEventViewModels
>({
  type: EVENTS_ACTION_TYPE,
  paging: DEFAULT_PAGING,
  filtering: DASHBOARD_PORTFOLIO_EVENTS_DEFAULT_FILTERING,
  defaultFilters: DASHBOARD_PORTFOLIO_EVENTS_FILTERS,
  clearable: true
});
