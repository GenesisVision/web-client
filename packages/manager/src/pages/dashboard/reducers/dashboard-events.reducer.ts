import { ManagerPortfolioEvents } from "gv-api-web";
import apiReducerFactory, {
  IApiState
} from "shared/reducers/reducer-creators/api-reducer";
import { apiSelector } from "shared/utils/selectors";
import { AuthRootState } from "shared/utils/types";

import { DASHBOARD_PORTFOLIO_EVENTS } from "../actions/dashboard.actions";

export type ManagerPortfolioEventsState = IApiState<ManagerPortfolioEvents>;

export const dashboardEventsSelector = apiSelector<
  ManagerPortfolioEvents,
  AuthRootState
>(state => state.dashboard.eventsData);

const dashboardEventsReducer = apiReducerFactory<ManagerPortfolioEvents>({
  apiType: DASHBOARD_PORTFOLIO_EVENTS
});
export default dashboardEventsReducer;
