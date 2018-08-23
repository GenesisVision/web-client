import apiReducerFactory, {
  SUCCESS_SUFFIX
} from "shared/reducers/api-reducer/api-reducer";

import { DASHBOARD_PORTFOLIO_EVENTS } from "../actions/dashboard-actions";

const portfolioEventsSubReducer = (state, action) => {
  switch (action.type) {
    case `${DASHBOARD_PORTFOLIO_EVENTS}_${SUCCESS_SUFFIX}`:
      return { ...state, events: action.payload.events };
    default:
      return state;
  }
};

const dashboardEvents = apiReducerFactory(
  {
    apiType: DASHBOARD_PORTFOLIO_EVENTS
  },
  portfolioEventsSubReducer
);
export default dashboardEvents;
