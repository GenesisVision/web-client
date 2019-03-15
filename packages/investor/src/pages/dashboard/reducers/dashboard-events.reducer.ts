import { DashboardPortfolioEvents } from "gv-api-web";
import apiReducerFactory, {
  IApiState
} from "shared/reducers/api-reducer/api-reducer";

import { DASHBOARD_PORTFOLIO_EVENTS } from "../actions/dashboard.actions";

export type DashboardEventsState = IApiState<DashboardPortfolioEvents>;

const dashboardEventsReducer = apiReducerFactory<DashboardPortfolioEvents>({
  apiType: DASHBOARD_PORTFOLIO_EVENTS
});

export default dashboardEventsReducer;
