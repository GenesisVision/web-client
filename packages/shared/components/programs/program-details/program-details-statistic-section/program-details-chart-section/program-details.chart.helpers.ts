import { useChartPeriodCreator } from "shared/components/details/details-statistic-section/details.chart.helpers";

import { statisticPeriodAction } from "../../actions/program-details.actions";
import { statisticPeriodSelector } from "../../reducers/statistic-period.reducer";

export const useChartPeriod = () =>
  useChartPeriodCreator(statisticPeriodSelector, statisticPeriodAction);
