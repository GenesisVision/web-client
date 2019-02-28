import { ManagerPortfolioEvents } from "gv-api-web";
import apiReducerFactory, {
  IApiReducerFactory
} from "shared/reducers/api-reducer/api-reducer";

import { DASHBOARD_PORTFOLIO_EVENTS } from "../actions/dashboard.actions";

export type ManagerPortfolioEventsState = IApiReducerFactory<
  ManagerPortfolioEvents
>;
const dashboardEventsReducer = apiReducerFactory<ManagerPortfolioEvents>({
  apiType: DASHBOARD_PORTFOLIO_EVENTS
});
export default dashboardEventsReducer;
