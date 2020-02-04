import { ChartDefaultPeriod } from "components/chart/chart-period/chart-period.helpers";

export const CHART_PERIOD_SUFFIX = "CHART_PERIOD";
export const composeChartPeriodActionType = (actionType: string): string =>
  `${actionType}_${CHART_PERIOD_SUFFIX}`;

const chartPeriodActionCreator = (
  actionType: string,
  period: ChartDefaultPeriod
) => {
  const chartPeriodAction = composeChartPeriodActionType(actionType);
  return {
    type: chartPeriodAction,
    payload: period
  };
};

export default chartPeriodActionCreator;
