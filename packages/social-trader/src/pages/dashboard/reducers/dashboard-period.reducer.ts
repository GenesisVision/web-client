import {
  ChartDefaultPeriod,
  getDefaultPeriod
} from "components/chart/chart-period/chart-period.helpers";
import defaultReducer from "reducers/reducer-creators/default-reducer";

import {
  DASHBOARD_PERIOD,
  TSetPeriodAction
} from "../actions/dashboard.actions";

const dashboardPeriodReducer = (
  state: ChartDefaultPeriod = getDefaultPeriod(),
  action: TSetPeriodAction
): ChartDefaultPeriod =>
  defaultReducer<TSetPeriodAction, ChartDefaultPeriod>(
    action,
    state,
    getDefaultPeriod(),
    DASHBOARD_PERIOD
  );

export default dashboardPeriodReducer;
