import { DashboardPortfolioEvents } from "gv-api-web";
import apiReducerFactory, {
  IApiState
} from "shared/reducers/reducer-creators/api-reducer";
import { apiSelector } from "shared/utils/selectors";
import { AuthRootState } from "shared/utils/types";

import { DASHBOARD_PORTFOLIO_EVENTS } from "../actions/dashboard.actions";

export type DashboardEventsState = IApiState<DashboardPortfolioEvents>;

export const dashboardEventsSelector = apiSelector<
  DashboardPortfolioEvents,
  AuthRootState
>(state => state.dashboard.eventsData);

const dashboardEventsReducer = apiReducerFactory<DashboardPortfolioEvents>({
  apiType: DASHBOARD_PORTFOLIO_EVENTS
});

export default dashboardEventsReducer;
