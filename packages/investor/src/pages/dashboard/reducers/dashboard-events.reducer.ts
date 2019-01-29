import { DashboardPortfolioEvents } from "gv-api-web";
import apiReducerFactory, {
  IApiReducerFactory
} from "shared/reducers/api-reducer/api-reducer";

import { DASHBOARD_PORTFOLIO_EVENTS } from "../actions/dashboard.actions";

export interface IDashboardEventsReducer
  extends IApiReducerFactory<DashboardPortfolioEvents> {}

const dashboardEventsReducer = apiReducerFactory<DashboardPortfolioEvents>({
  apiType: DASHBOARD_PORTFOLIO_EVENTS
});

export default dashboardEventsReducer;
