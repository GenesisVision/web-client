import {
  ChartDefaultPeriod,
  DEFAULT_PERIOD
} from "shared/components/chart/chart-period/chart-period.helpers";
import defaultReducer from "shared/reducers/reducer-creators/default-reducer";
import { ActionType } from "shared/utils/types";

import { composeChartPeriodActionType } from "../../actions/chart-period.action-creator";

const chartPeriodReducer = (
  actionType: string,
  initialState = DEFAULT_PERIOD
) => (
  state: ChartDefaultPeriod = initialState,
  action: ActionType<ChartDefaultPeriod>
) => {
  const chartPeriodAction = composeChartPeriodActionType(actionType);
  return defaultReducer(action, state, initialState, chartPeriodAction);
};

export default chartPeriodReducer;
