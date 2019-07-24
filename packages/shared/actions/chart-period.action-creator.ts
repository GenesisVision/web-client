export const CHART_PERIOD_SUFFIX = "CHART_PERIOD";
export const composeChartPeriodActionType = (actionType: string): string =>
  `${actionType}_${CHART_PERIOD_SUFFIX}`;

const chartPeriodActionCreator = (actionType: string) => {
  const chartPeriodAction = composeChartPeriodActionType(actionType);
  return {
    type: chartPeriodAction
  };
};

export default chartPeriodActionCreator;
